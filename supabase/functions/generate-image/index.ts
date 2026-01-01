import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: simple in-memory store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60000;

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) return true;
  record.count++;
  return false;
}

function validatePrompt(prompt: unknown): string {
  if (typeof prompt !== "string") throw new Error("INVALID_PROMPT");
  const trimmed = prompt.trim();
  if (trimmed.length < 3) throw new Error("PROMPT_TOO_SHORT");
  if (trimmed.length > 1000) throw new Error("PROMPT_TOO_LONG");
  return trimmed.replace(/<[^>]*>/g, "").substring(0, 1000);
}

function validateDimension(value: unknown, defaultVal: number): number {
  if (value === undefined || value === null) return defaultVal;
  const num = Number(value);
  if (isNaN(num)) return defaultVal;
  return Math.min(Math.max(Math.round(num), 256), 2048);
}

// Map internal errors to user-friendly messages
function getUserFriendlyError(errorCode: string): string {
  const errorMap: Record<string, string> = {
    "INVALID_PROMPT": "Please provide a valid prompt",
    "PROMPT_TOO_SHORT": "Prompt must be at least 3 characters",
    "PROMPT_TOO_LONG": "Prompt is too long",
    "SERVICE_UNAVAILABLE": "Service temporarily unavailable. Please try again.",
    "RATE_LIMITED": "Too many requests. Please wait a moment.",
  };
  return errorMap[errorCode] || "An error occurred. Please try again.";
}

serve(async (req) => {
  const requestId = generateRequestId();
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
    
    if (isRateLimited(clientIP)) {
      console.warn(`[${requestId}] Rate limited: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: getUserFriendlyError("RATE_LIMITED"), requestId }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const prompt = validatePrompt(body.prompt);
    const width = validateDimension(body.width, 1024);
    const height = validateDimension(body.height, 1024);
    const model = typeof body.model === "string" ? body.model : "flux";

    console.log(`[${requestId}] Generating: ${prompt.substring(0, 50)}... (${width}x${height})`);

    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&model=${model}&nologo=true`;
    const imageResponse = await fetch(pollinationsUrl);
    
    if (!imageResponse.ok) {
      console.error(`[${requestId}] Pollinations API error: ${imageResponse.status}`);
      throw new Error("SERVICE_UNAVAILABLE");
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
    const mimeType = imageResponse.headers.get("content-type") || "image/webp";

    console.log(`[${requestId}] Generated successfully: ${base64.length} bytes`);

    return new Response(
      JSON.stringify({ image: `data:${mimeType};base64,${base64}`, format: "webp" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorCode = error instanceof Error ? error.message : "UNKNOWN";
    console.error(`[${requestId}] Error:`, errorCode);
    
    return new Response(
      JSON.stringify({ 
        error: getUserFriendlyError(errorCode), 
        requestId 
      }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
