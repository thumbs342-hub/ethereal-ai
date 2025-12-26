import { useState } from "react";
import { Sparkles, Upload, Loader2, Download, AlertCircle } from "lucide-react";
import { TabType } from "./Navigation";

interface GeneratorPanelProps {
  activeTab: TabType;
  credits: number;
  onGenerate: (cost: number) => void;
}

const tabConfig = {
  video: {
    title: "Générateur Vidéo 30s",
    description: "Créez des vidéos ultra-réalistes de 30 secondes avec vos visages",
    placeholder: "Décrivez votre scène vidéo... Ex: Un homme en costume marchant dans une ville futuriste au coucher du soleil",
    cost: 133,
    acceptFile: "video/*,image/*",
    fileLabel: "Vidéo ou image de référence",
  },
  photo: {
    title: "Générateur Photo HD",
    description: "Photos ultra-haute résolution avec textures de peau réalistes",
    placeholder: "Décrivez votre photo... Ex: Portrait professionnel en studio avec éclairage dramatique",
    cost: 20,
    acceptFile: "image/*",
    fileLabel: "Image de référence",
  },
  voice: {
    title: "Clonage Vocal",
    description: "Clonez votre voix exacte à partir d'un échantillon audio",
    placeholder: "Texte à prononcer avec la voix clonée...",
    cost: 100,
    acceptFile: "audio/*",
    fileLabel: "Échantillon vocal (min. 30s)",
  },
  clothing: {
    title: "Virtual Try-On",
    description: "Changez les vêtements sans altérer le corps",
    placeholder: "Décrivez le style vestimentaire souhaité... Ex: Costume trois-pièces noir avec cravate dorée",
    cost: 30,
    acceptFile: "image/*",
    fileLabel: "Photo avec vêtements à modifier",
  },
  posters: {
    title: "Studio Affiches & Flyers",
    description: "Créez des visuels marketing HD professionnels",
    placeholder: "Décrivez votre affiche... Ex: Affiche de concert style néon avec artiste au centre",
    cost: 40,
    acceptFile: "image/*",
    fileLabel: "Image de base (optionnel)",
  },
};

const GeneratorPanel = ({ activeTab, credits, onGenerate }: GeneratorPanelProps) => {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const config = tabConfig[activeTab];
  const canGenerate = credits >= config.cost && prompt.trim().length > 0;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    setProgress(0);
    setResult(null);

    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 4000));

    clearInterval(interval);
    setProgress(100);
    
    // Simulate result
    setTimeout(() => {
      setIsGenerating(false);
      setResult("/placeholder.svg"); // Would be actual result
      onGenerate(config.cost);
    }, 500);
  };

  const handleReset = () => {
    setPrompt("");
    setFile(null);
    setResult(null);
    setProgress(0);
  };

  return (
    <div className="glass-card rounded-2xl p-6 fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-semibold gold-text mb-1">
            {config.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {config.description}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">{config.cost} crédits</span>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-secondary-foreground">Résultat</span>
            <button className="btn-luxury-outline text-sm flex items-center gap-2 py-2 px-4">
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </div>
          <div className="aspect-video rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            <img src={result} alt="Résultat" className="max-w-full max-h-full object-contain" />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Sortie 'Ghost' — Aucun logo, aucune signature, aucune méta-donnée
          </p>
        </div>
      )}

      {/* File Upload */}
      {!result && (
        <div className="mb-4">
          <label className="upload-zone flex flex-col items-center cursor-pointer">
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground mb-1">{config.fileLabel}</span>
            {file ? (
              <span className="text-xs text-primary">{file.name}</span>
            ) : (
              <span className="text-xs text-muted-foreground">Glissez ou cliquez pour uploader</span>
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
        <div className="mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={config.placeholder}
            className="w-full h-32 p-4 rounded-xl bg-muted/50 border border-border text-secondary-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>
      )}

      {/* Progress Bar */}
      {isGenerating && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Génération en cours...</span>
            <span className="text-sm text-primary">{Math.round(progress)}%</span>
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
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive">
            Crédits insuffisants. Vous avez besoin de {config.cost} crédits.
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        {result ? (
          <>
            <button 
              onClick={handleReset}
              className="btn-luxury-outline flex-1"
            >
              Nouvelle création
            </button>
          </>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="btn-luxury flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Génération...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
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
