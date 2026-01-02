import { X } from "lucide-react";

interface StickersPanelProps {
  onStickerSelect: (stickerUrl: string) => void;
  onClose: () => void;
}

// Simple emoji stickers as SVG data URLs
const stickers = [
  { id: "star", emoji: "⭐", label: "Étoile" },
  { id: "heart", emoji: "❤️", label: "Cœur" },
  { id: "fire", emoji: "🔥", label: "Feu" },
  { id: "check", emoji: "✅", label: "Check" },
  { id: "crown", emoji: "👑", label: "Couronne" },
  { id: "rocket", emoji: "🚀", label: "Fusée" },
  { id: "sparkles", emoji: "✨", label: "Étincelles" },
  { id: "diamond", emoji: "💎", label: "Diamant" },
  { id: "trophy", emoji: "🏆", label: "Trophée" },
  { id: "target", emoji: "🎯", label: "Cible" },
  { id: "lightning", emoji: "⚡", label: "Éclair" },
  { id: "music", emoji: "🎵", label: "Musique" },
  { id: "camera", emoji: "📸", label: "Photo" },
  { id: "gift", emoji: "🎁", label: "Cadeau" },
  { id: "party", emoji: "🎉", label: "Fête" },
  { id: "thumbsup", emoji: "👍", label: "Pouce" },
  { id: "clap", emoji: "👏", label: "Applaudir" },
  { id: "100", emoji: "💯", label: "100" },
  { id: "cool", emoji: "😎", label: "Cool" },
  { id: "love", emoji: "😍", label: "Amour" },
];

// Convert emoji to canvas-compatible image
const createEmojiDataUrl = (emoji: string, size = 120): string => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  
  ctx.font = `${size * 0.8}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, size / 2, size / 2);
  
  return canvas.toDataURL("image/png");
};

export const StickersPanel = ({ onStickerSelect, onClose }: StickersPanelProps) => {
  const handleStickerClick = (emoji: string) => {
    const dataUrl = createEmojiDataUrl(emoji);
    onStickerSelect(dataUrl);
  };

  return (
    <div className="absolute right-0 top-0 w-64 h-full bg-card/95 backdrop-blur-md border-l border-border/50 z-20 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <span className="text-sm font-medium text-secondary-foreground">Autocollants</span>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Stickers Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-4 gap-2">
          {stickers.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => handleStickerClick(sticker.emoji)}
              className="aspect-square flex items-center justify-center text-2xl rounded-lg bg-muted/30 hover:bg-muted/60 transition-all hover:scale-105 active:scale-95"
              title={sticker.label}
            >
              {sticker.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border/50">
        <p className="text-[10px] text-muted-foreground text-center">
          Cliquez pour ajouter au canvas
        </p>
      </div>
    </div>
  );
};
