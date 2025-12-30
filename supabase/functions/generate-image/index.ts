import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, width = 1024, height = 1024, model = "flux" } = await req.json();

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    console.log(`Generating image: "${prompt}" (${width}x${height}) with ${model}`);

    // Pollinations.ai - Free unlimited API
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=${model}&nologo=true`;

    // Fetch the image to verify it works and get base64
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      throw new Error(`Image generation failed: ${imageResponse.status}`);
    }

    const imageBlob = await imageResponse.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(imageBlob)));
    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";

    console.log(`Image generated successfully, size: ${imageBlob.byteLength} bytes`);

    return new Response(
      JSON.stringify({
        success: true,
        image: `data:${contentType};base64,${base64}`,
        url: imageUrl,
        prompt,
        dimensions: { width, height },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Generation error:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
