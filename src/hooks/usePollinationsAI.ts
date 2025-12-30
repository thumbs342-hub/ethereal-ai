import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GenerateImageOptions {
  prompt: string;
  width?: number;
  height?: number;
  model?: "flux" | "turbo";
}

interface GenerationResult {
  success: boolean;
  image?: string;
  url?: string;
  error?: string;
}

export const usePollinationsAI = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<GenerationResult | null>(null);

  const generateImage = async (options: GenerateImageOptions): Promise<GenerationResult> => {
    setIsGenerating(true);
    setProgress(0);
    setResult(null);

    try {
      // Simulate progress for UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: options,
      });

      clearInterval(progressInterval);

      if (error) {
        throw new Error(error.message);
      }

      setProgress(100);
      setResult(data);
      return data;
    } catch (error) {
      const errorResult = {
        success: false,
        error: error instanceof Error ? error.message : "Erreur inconnue",
      };
      setResult(errorResult);
      return errorResult;
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setIsGenerating(false);
    setProgress(0);
    setResult(null);
  };

  return {
    generateImage,
    isGenerating,
    progress,
    result,
    reset,
  };
};
