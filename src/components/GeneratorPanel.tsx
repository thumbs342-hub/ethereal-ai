import { useState } from "react";
import { Sparkles, Upload, Loader2, Download, AlertCircle, Play, Mic, Shirt, Image } from "lucide-react";
import { TabType } from "./Navigation";
import { supabase } from "@/integrations/supabase/client";
import { GeneratorSkeleton } from "./ui/skeleton-loader";

interface GeneratorPanelProps {
  activeTab: TabType;
  credits: number;
  onGenerate: (cost: number) => void;
}

const tabConfig = {
  video: {
    title: "Forge Vidéo 4K",
    description: "Vidéos 30s ultra-réalistes avec vos visages",
    placeholder: "Décrivez votre scène... Ex: Homme en costume dans une ville futuriste au crépuscule",
    cost: 133,
    acceptFile: "video/*,image/*",
    fileLabel: "Vidéo/image de référence",
    icon: Play,
    isMock: true,
  },
  photo: {
    title: "Forge Photo HD",
    description: "Photos haute résolution avec textures réalistes",
    placeholder: "Décrivez votre photo... Ex: Portrait studio éclairage dramatique",
    cost: 20,
    acceptFile: "image/*",
    fileLabel: "Image de référence",
    icon: Image,
    isMock: false, // Uses Pollinations.ai
  },
  voice: {
    title: "Clonage Vocal",
    description: "Clonez votre voix à partir d'un échantillon audio",
    placeholder: "Texte à prononcer avec la voix clonée...",
    cost: 100,
    acceptFile: "audio/*",
    fileLabel: "Échantillon vocal (min. 30s)",
    icon: Mic,
    isMock: true,
  },
  clothing: {
    title: "Try-On Virtuel",
    description: "Changez les vêtements sans altérer le corps",
    placeholder: "Style vestimentaire... Ex: Costume noir cravate dorée",
    cost: 30,
    acceptFile: "image/*",
    fileLabel: "Photo à modifier",
    icon: Shirt,
    isMock: true,
  },
  posters: {
    title: "Studio Flyers HD",
    description: "Visuels marketing professionnels",
    placeholder: "Décrivez votre flyer... Ex: Affiche concert style néon moderne",
    cost: 40,
    acceptFile: "image/*",
    fileLabel: "Image de base (optionnel)",
    icon: Image,
    isMock: false, // Uses Pollinations.ai
  },
};

// Mock results for demo modules
const mockResults: Record<string, string> = {
  video: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIj48cmVjdCBmaWxsPSIjMTExIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZpbGw9IiNDMEMwQzAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5WaWTDqW8gNEsgR2VuZXJhdGVkPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmaWxsPSIjODg4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TW9jayAtIEFQSSBjb21pbmcgc29vbjwvdGV4dD48L3N2Zz4=",
  voice: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIj48cmVjdCBmaWxsPSIjMTExIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZpbGw9IiNDMEMwQzAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn46kIFZvaWNlIENsb25lZDwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjYwJSIgZmlsbD0iIzg4OCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1vY2sgQXVkaW8gLSBBUEkgY29taW5nIHNvb248L3RleHQ+PC9zdmc+",
  clothing: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIj48cmVjdCBmaWxsPSIjMTExIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZpbGw9IiNDMEMwQzAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5G5IFRyeS1PbiBSZXN1bHQ8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI1NSUiIGZpbGw9IiM4ODgiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Nb2NrIC0gQVBJIGNvbWluZyBzb29uPC90ZXh0Pjwvc3ZnPg==",
};

const GeneratorPanel = ({ activeTab, credits, onGenerate }: GeneratorPanelProps) => {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const config = tabConfig[activeTab];
  const canGenerate = credits >= config.cost && prompt.trim().length > 0;
  const IconComponent = config.icon;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    setProgress(0);
    setResult(null);
    setError(null);

    // Progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 12;
      });
    }, 400);

    try {
      if (config.isMock) {
        // Mock mode for Video, Voice, Try-On
        await new Promise(resolve => setTimeout(resolve, 2500));
        clearInterval(interval);
        setProgress(100);
        setResult(mockResults[activeTab] || mockResults.video);
      } else {
        // Real API call for Photo and Flyers (Pollinations.ai)
        const { data, error: fnError } = await supabase.functions.invoke("generate-image", {
          body: {
            prompt: prompt.trim(),
            width: activeTab === "posters" ? 1024 : 768,
            height: activeTab === "posters" ? 1024 : 768,
            model: "flux",
          },
        });

        clearInterval(interval);

        if (fnError) {
          throw new Error(fnError.message || "Erreur de génération");
        }

        if (data?.error) {
          throw new Error(data.error);
        }

        setProgress(100);
        setResult(data.image);
      }

      onGenerate(config.cost);
    } catch (err) {
      clearInterval(interval);
      setError(err instanceof Error ? err.message : "Erreur inattendue");
      setProgress(0);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    
    const link = document.createElement("a");
    link.href = result;
    link.download = `forge-${activeTab}-${Date.now()}.webp`;
    link.click();
  };

  const handleReset = () => {
    setPrompt("");
    setFile(null);
    setResult(null);
    setProgress(0);
    setError(null);
  };

  // Show skeleton while initial load
  if (isGenerating && progress < 10) {
    return <GeneratorSkeleton />;
  }

  return (
    <div className="glass-card rounded-2xl p-6 fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-secondary-foreground mb-0.5">
              {config.title}
            </h2>
            <p className="text-xs text-muted-foreground">
              {config.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">{config.cost} cr</span>
        </div>
      </div>

      {/* Mock Badge */}
      {config.isMock && !result && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-muted/50 border border-border/50">
          <span className="text-xs text-muted-foreground">
            ⚡ Mode Démo — API en cours d'intégration
          </span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          <span className="text-sm text-destructive">{error}</span>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="mb-6 p-4 rounded-xl bg-muted/30 border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-secondary-foreground">Résultat</span>
            <button 
              onClick={handleDownload}
              className="btn-luxury-outline text-xs flex items-center gap-1.5 py-1.5 px-3"
            >
              <Download className="w-3.5 h-3.5" />
              WebP
            </button>
          </div>
          <div className="aspect-video rounded-lg bg-background/50 flex items-center justify-center overflow-hidden">
            <img 
              src={result} 
              alt="Résultat" 
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center opacity-60">
            Ghost Mode — Aucune signature, aucune méta-donnée
          </p>
        </div>
      )}

      {/* File Upload */}
      {!result && (
        <div className="mb-4">
          <label className="upload-zone flex flex-col items-center cursor-pointer py-6">
            <Upload className="w-6 h-6 text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground mb-1">{config.fileLabel}</span>
            {file ? (
              <span className="text-xs text-primary">{file.name}</span>
            ) : (
              <span className="text-[10px] text-muted-foreground/60">Glissez ou cliquez</span>
            )}
            <input
              type="file"
              accept={config.acceptFile}
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      )}

      {/* Prompt Input */}
      {!result && (
        <div className="mb-5">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
            placeholder={config.placeholder}
            maxLength={500}
            className="w-full h-24 p-3 rounded-xl bg-muted/30 border border-border/50 text-secondary-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all text-sm"
          />
          <div className="text-right mt-1">
            <span className="text-[10px] text-muted-foreground/50">{prompt.length}/500</span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isGenerating && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Génération...</span>
            <span className="text-xs text-primary font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="progress-luxury">
            <div 
              className="progress-luxury-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Credit Warning */}
      {credits < config.cost && !result && (
        <div className="mb-4 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
          <span className="text-xs text-destructive">
            Crédits insuffisants ({config.cost} requis)
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {result ? (
          <button 
            onClick={handleReset}
            className="btn-luxury-outline flex-1 text-sm py-2.5"
          >
            Nouvelle création
          </button>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="btn-luxury flex-1 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm py-2.5"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Génération...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Générer
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneratorPanel;
