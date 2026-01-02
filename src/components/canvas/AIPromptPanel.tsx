import { useState } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";

interface AIPromptPanelProps {
  onGenerate: (imageUrl: string) => void;
  isLoading: boolean;
  onLoadingChange: (loading: boolean) => void;
}

export const AIPromptPanel = ({ onGenerate, isLoading, onLoadingChange }: AIPromptPanelProps) => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setError(null);
    onLoadingChange(true);

    try {
      // Build Pollinations.ai URL with encoded prompt
      const encodedPrompt = encodeURIComponent(prompt.trim());
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=768&nologo=true&seed=${Date.now()}`;

      // Preload image to verify it loads correctly
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Échec du chargement de l'image"));
        img.src = imageUrl;
      });

      // Insert into canvas
      onGenerate(imageUrl);
      setPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de génération");
    } finally {
      onLoadingChange(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="p-4 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl space-y-3">
      <div className="flex items-center gap-2 text-primary">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">Générer avec IA</span>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
          <span className="text-xs text-destructive">{error}</span>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Décrivez l'image à générer..."
          disabled={isLoading}
          className="flex-1 px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-secondary-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm disabled:opacity-50"
        />
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isLoading}
          className="btn-luxury px-4 py-2 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">Générer</span>
        </button>
      </div>

      <p className="text-[10px] text-muted-foreground/60">
        Propulsé par Pollinations.ai — Génération illimitée et gratuite
      </p>
    </div>
  );
};
