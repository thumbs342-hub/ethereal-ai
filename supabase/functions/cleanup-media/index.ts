import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get files older than 24 hours
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    console.log(`Cleaning up files older than: ${cutoffTime}`);

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

    // Delete old files
    const filesToDelete = oldFiles.map((f) => f.name);
    console.log(`Deleting ${filesToDelete.length} files:`, filesToDelete);

    const { error: deleteError } = await supabase.storage
      .from("forge-results")
      .remove(filesToDelete);

    if (deleteError) {
      console.error("Error deleting files:", deleteError);
      throw deleteError;
    }

    console.log(`Successfully deleted ${filesToDelete.length} files`);

    return new Response(
      JSON.stringify({
        message: "Cleanup completed",
        deleted: filesToDelete.length,
        files: filesToDelete,
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
