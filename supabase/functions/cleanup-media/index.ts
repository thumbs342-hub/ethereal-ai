import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateRequestId(): string {
  return `cleanup_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

serve(async (req) => {
  const requestId = generateRequestId();
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authorization - only service role or cron can call this
    const authHeader = req.headers.get("authorization");
    const cleanupToken = req.headers.get("x-cleanup-token");
    const CLEANUP_SECRET = Deno.env.get("CLEANUP_SECRET");
    
    // Validate service role key securely
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const isServiceRole = authHeader && serviceRoleKey && 
      authHeader.replace("Bearer ", "") === serviceRoleKey;
    
    // Validate cleanup token securely
    const isValidToken = CLEANUP_SECRET && cleanupToken && 
      cleanupToken === CLEANUP_SECRET;
    
    if (!isServiceRole && !isValidToken) {
      console.warn(`[${requestId}] Unauthorized cleanup attempt`);
      return new Response(
        JSON.stringify({ error: "Unauthorized", requestId }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Delete files older than 24 hours
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    console.log(`[${requestId}] Cleaning files older than: ${cutoffTime}`);

    // List all files in forge-results bucket
    const { data: files, error: listError } = await supabase.storage
      .from("forge-results")
      .list("", { limit: 1000 });

    if (listError) {
      console.error(`[${requestId}] Error listing files:`, listError.message);
      return new Response(
        JSON.stringify({ error: "Failed to list files", requestId }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!files || files.length === 0) {
      console.log(`[${requestId}] No files to clean up`);
      return new Response(
        JSON.stringify({ message: "No files to clean up", deleted: 0, requestId }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Filter files older than 24h
    const oldFiles = files.filter((file) => {
      if (!file.created_at) return false;
      return new Date(file.created_at) < new Date(cutoffTime);
    });

    if (oldFiles.length === 0) {
      console.log(`[${requestId}] No expired files found`);
      return new Response(
        JSON.stringify({ message: "No expired files", deleted: 0, requestId }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Delete old files
    const filesToDelete = oldFiles.map((f) => f.name);
    console.log(`[${requestId}] Deleting ${filesToDelete.length} expired files`);

    const { error: deleteError } = await supabase.storage
      .from("forge-results")
      .remove(filesToDelete);

    if (deleteError) {
      console.error(`[${requestId}] Error deleting files:`, deleteError.message);
      return new Response(
        JSON.stringify({ error: "Failed to delete files", requestId }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[${requestId}] Successfully deleted ${filesToDelete.length} files`);

    return new Response(
      JSON.stringify({
        message: "Cleanup completed",
        deleted: filesToDelete.length,
        requestId
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error(`[${requestId}] Unexpected error:`, error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred", requestId }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
