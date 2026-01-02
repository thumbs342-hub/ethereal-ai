import { MousePointer2, Move, Type, Trash2, Download, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type CanvasTool = "select" | "move" | "text" | "delete";

interface CanvasToolbarProps {
  activeTool: CanvasTool;
  onToolChange: (tool: CanvasTool) => void;
  onClear: () => void;
  onExport: () => void;
  hasSelection: boolean;
  onDeleteSelected: () => void;
}

const tools = [
  { id: "select" as CanvasTool, icon: MousePointer2, label: "Sélection" },
  { id: "move" as CanvasTool, icon: Move, label: "Déplacer" },
  { id: "text" as CanvasTool, icon: Type, label: "Texte" },
  { id: "delete" as CanvasTool, icon: Trash2, label: "Supprimer" },
];

export const CanvasToolbar = ({
  activeTool,
  onToolChange,
  onClear,
  onExport,
  hasSelection,
  onDeleteSelected,
}: CanvasToolbarProps) => {
  return (
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

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        {hasSelection && activeTool === "delete" && (
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
  );
};
