import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, FabricImage, IText, FabricObject } from "fabric";
import { CanvasToolbar, CanvasTool } from "./CanvasToolbar";
import { AIPromptPanel } from "./AIPromptPanel";
import { toast } from "sonner";

interface FabricCanvasEditorProps {
  width?: number;
  height?: number;
}

export const FabricCanvasEditor = ({ width = 800, height = 600 }: FabricCanvasEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<CanvasTool>("select");
  const [hasSelection, setHasSelection] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width, height });

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: "#111111",
      selection: true,
    });

    // Selection events
    canvas.on("selection:created", () => setHasSelection(true));
    canvas.on("selection:updated", () => setHasSelection(true));
    canvas.on("selection:cleared", () => setHasSelection(false));

    setFabricCanvas(canvas);
    toast.success("Canvas prêt !");

    return () => {
      canvas.dispose();
    };
  }, []);

  // Responsive canvas sizing
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current || !fabricCanvas) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const aspectRatio = height / width;
      const newWidth = Math.min(containerWidth - 32, width);
      const newHeight = newWidth * aspectRatio;

      fabricCanvas.setDimensions({ width: newWidth, height: newHeight });
      setCanvasSize({ width: newWidth, height: newHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [fabricCanvas, width, height]);

  // Tool behavior
  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.selection = activeTool === "select";
    fabricCanvas.forEachObject((obj: FabricObject) => {
      obj.selectable = activeTool === "select" || activeTool === "move" || activeTool === "delete";
      obj.evented = activeTool !== "text";
    });

    // Mouse down for text tool
    const handleMouseDown = (e: { pointer?: { x: number; y: number } }) => {
      if (activeTool === "text" && e.pointer) {
        const text = new IText("Texte", {
          left: e.pointer.x,
          top: e.pointer.y,
          fontFamily: "Inter, sans-serif",
          fontSize: 24,
          fill: "#D4A853",
          editable: true,
        });
        fabricCanvas.add(text);
        fabricCanvas.setActiveObject(text);
        text.enterEditing();
        setActiveTool("select");
      }
    };

    fabricCanvas.on("mouse:down", handleMouseDown);

    return () => {
      fabricCanvas.off("mouse:down", handleMouseDown);
    };
  }, [activeTool, fabricCanvas]);

  // Add AI-generated image to canvas
  const handleAIGenerate = useCallback(async (imageUrl: string) => {
    if (!fabricCanvas) return;

    try {
      const img = await FabricImage.fromURL(imageUrl, { crossOrigin: "anonymous" });
      
      // Scale image to fit canvas
      const scale = Math.min(
        (canvasSize.width * 0.8) / (img.width || 1),
        (canvasSize.height * 0.8) / (img.height || 1)
      );
      
      img.scale(scale);
      img.set({
        left: canvasSize.width / 2,
        top: canvasSize.height / 2,
        originX: "center",
        originY: "center",
      });

      fabricCanvas.add(img);
      fabricCanvas.setActiveObject(img);
      fabricCanvas.renderAll();
      
      toast.success("Image ajoutée au canvas !");
    } catch (err) {
      toast.error("Erreur lors de l'ajout de l'image");
      console.error(err);
    }
  }, [fabricCanvas, canvasSize]);

  // Delete selected objects
  const handleDeleteSelected = useCallback(() => {
    if (!fabricCanvas) return;

    const activeObjects = fabricCanvas.getActiveObjects();
    if (activeObjects.length === 0) {
      toast.error("Sélectionnez un objet à supprimer");
      return;
    }

    activeObjects.forEach((obj) => fabricCanvas.remove(obj));
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
    setHasSelection(false);
    toast.success("Objet(s) supprimé(s)");
  }, [fabricCanvas]);

  // Clear canvas
  const handleClear = useCallback(() => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#111111";
    fabricCanvas.renderAll();
    toast.success("Canvas réinitialisé");
  }, [fabricCanvas]);

  // Export canvas
  const handleExport = useCallback(() => {
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `kpogo-design-${Date.now()}.png`;
    link.click();

    toast.success("Image exportée !");
  }, [fabricCanvas]);

  return (
    <div ref={containerRef} className="space-y-4 w-full">
      {/* AI Prompt Panel */}
      <AIPromptPanel
        onGenerate={handleAIGenerate}
        isLoading={isGenerating}
        onLoadingChange={setIsGenerating}
      />

      {/* Toolbar */}
      <CanvasToolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        onClear={handleClear}
        onExport={handleExport}
        hasSelection={hasSelection}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* Canvas Container */}
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/30">
        {/* Loading overlay */}
        {isGenerating && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-muted-foreground">Génération en cours...</span>
            </div>
          </div>
        )}

        {/* Fabric Canvas */}
        <canvas ref={canvasRef} className="block mx-auto" />
      </div>

      {/* Instructions */}
      <div className="text-center text-xs text-muted-foreground/60 space-x-3">
        <span>🖱️ Sélection</span>
        <span>📝 Double-clic pour éditer le texte</span>
        <span>⌫ Suppr pour effacer</span>
      </div>
    </div>
  );
};
