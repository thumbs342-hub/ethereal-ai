import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Secret token for cron job authentication
const CLEANUP_SECRET = Deno.env.get("CLEANUP_SECRET") || "default-cleanup-secret";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authorization - only service role or cron can call this
    const authHeader = req.headers.get("authorization");
    const cleanupToken = req.headers.get("x-cleanup-token");
    
    // Check if called by service role or with cleanup token
    const isServiceRole = authHeader?.includes(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "");
    const isValidToken = cleanupToken === CLEANUP_SECRET;
    
    if (!isServiceRole && !isValidToken) {
      console.warn("Unauthorized cleanup attempt");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Ghost mode: delete files older than 24 hours
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    console.log(`[GHOST MODE] Cleaning files older than: ${cutoffTime}`);

    // List all files in forge-results bucket
    const { data: files, error: listError } = await supabase.storage
      .from("forge-results")
      .list("", { limit: 1000 });

    if (listError) {
      console.error("Error listing files:", listError);
      throw listError;
    }

    if (!files || files.length === 0) {
      console.log("No files to clean up");
      return new Response(
        JSON.stringify({ message: "No files to clean up", deleted: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Filter files older than 24h
    const oldFiles = files.filter((file) => {
      if (!file.created_at) return false;
      return new Date(file.created_at) < new Date(cutoffTime);
    });

    if (oldFiles.length === 0) {
      console.log("No expired files found");
      return new Response(
        JSON.stringify({ message: "No expired files", deleted: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Delete old files - Ghost mode active
    const filesToDelete = oldFiles.map((f) => f.name);
    console.log(`[GHOST] Deleting ${filesToDelete.length} expired files`);

    const { error: deleteError } = await supabase.storage
      .from("forge-results")
      .remove(filesToDelete);

    if (deleteError) {
      console.error("Error deleting files:", deleteError);
      throw deleteError;
    }

    console.log(`[GHOST] Successfully deleted ${filesToDelete.length} files - Zero trace mode active`);

    return new Response(
      JSON.stringify({
        message: "Ghost cleanup completed",
        deleted: filesToDelete.length,
        mode: "zero-trace"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Cleanup error:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
