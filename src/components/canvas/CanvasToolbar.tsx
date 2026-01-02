import { 
  MousePointer2, 
  Move, 
  Type, 
  Trash2, 
  Download, 
  RotateCcw,
  Paintbrush,
  Upload,
  Sticker
} from "lucide-react";
import { cn } from "@/lib/utils";

export type CanvasTool = "select" | "move" | "text" | "delete" | "brush";

interface CanvasToolbarProps {
  activeTool: CanvasTool;
  onToolChange: (tool: CanvasTool) => void;
  onClear: () => void;
  onExport: () => void;
  hasSelection: boolean;
  onDeleteSelected: () => void;
  onUploadClick: () => void;
  onStickersClick: () => void;
  brushColor: string;
  onBrushColorChange: (color: string) => void;
  brushWidth: number;
  onBrushWidthChange: (width: number) => void;
  showBrushSettings: boolean;
}

const tools = [
  { id: "select" as CanvasTool, icon: MousePointer2, label: "Sélection" },
  { id: "move" as CanvasTool, icon: Move, label: "Déplacer" },
  { id: "brush" as CanvasTool, icon: Paintbrush, label: "Pinceau" },
  { id: "text" as CanvasTool, icon: Type, label: "Texte" },
  { id: "delete" as CanvasTool, icon: Trash2, label: "Supprimer" },
];

const colors = [
  "#D4A853", // Gold
  "#FFFFFF", // White
  "#EF4444", // Red
  "#22C55E", // Green
  "#3B82F6", // Blue
  "#A855F7", // Purple
  "#F97316", // Orange
  "#EC4899", // Pink
  "#000000", // Black
];

const brushWidths = [2, 4, 8, 12, 20];

export const CanvasToolbar = ({
  activeTool,
  onToolChange,
  onClear,
  onExport,
  hasSelection,
  onDeleteSelected,
  onUploadClick,
  onStickersClick,
  brushColor,
  onBrushColorChange,
  brushWidth,
  onBrushWidthChange,
  showBrushSettings,
}: CanvasToolbarProps) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Main Toolbar */}
      <div className="flex items-center justify-between gap-2 p-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl">
        {/* Tool Buttons */}
        <div className="flex items-center gap-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            
            return (
              <button
                key={tool.id}
                onClick={() => onToolChange(tool.id)}
                className={cn(
                  "p-2.5 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                title={tool.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-border/50" />

        {/* Upload & Stickers */}
        <div className="flex items-center gap-1">
          <button
            onClick={onUploadClick}
            className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            title="Uploader une image"
          >
            <Upload className="w-4 h-4" />
          </button>
          <button
            onClick={onStickersClick}
            className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            title="Autocollants"
          >
            <Sticker className="w-4 h-4" />
          </button>
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-border/50" />

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {hasSelection && (
            <button
              onClick={onDeleteSelected}
              className="p-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
              title="Supprimer sélection"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={onClear}
            className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            title="Réinitialiser"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            onClick={onExport}
            className="p-2.5 rounded-lg text-primary hover:bg-primary/10 transition-all"
            title="Exporter"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Brush Settings Panel */}
      {showBrushSettings && (
        <div className="flex flex-wrap items-center gap-4 p-3 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl">
          {/* Color Picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Couleur:</span>
            <div className="flex gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => onBrushColorChange(color)}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all",
                    brushColor === color 
                      ? "border-primary scale-110" 
                      : "border-border/50 hover:scale-105"
                  )}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Width Picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Épaisseur:</span>
            <div className="flex gap-1">
              {brushWidths.map((width) => (
                <button
                  key={width}
                  onClick={() => onBrushWidthChange(width)}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                    brushWidth === width
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                  )}
                  title={`${width}px`}
                >
                  <div 
                    className="rounded-full bg-current" 
                    style={{ width: Math.min(width, 16), height: Math.min(width, 16) }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
