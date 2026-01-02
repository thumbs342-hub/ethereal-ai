import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, FabricImage, IText, FabricObject, PencilBrush } from "fabric";
import { CanvasToolbar, CanvasTool } from "./CanvasToolbar";
import { TextToolPanel } from "./TextToolPanel";
import { StickersPanel } from "./StickersPanel";
import { AIPromptPanel } from "./AIPromptPanel";
import { toast } from "sonner";

interface FabricCanvasEditorProps {
  width?: number;
  height?: number;
}

export const FabricCanvasEditor = ({ width = 800, height = 600 }: FabricCanvasEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeTool, setActiveTool] = useState<CanvasTool>("select");
  const [hasSelection, setHasSelection] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width, height });
  
  // Brush settings
  const [brushColor, setBrushColor] = useState("#D4A853");
  const [brushWidth, setBrushWidth] = useState(4);
  
  // Text settings
  const [selectedFont, setSelectedFont] = useState("'Inter', sans-serif");
  const [textColor, setTextColor] = useState("#D4A853");
  const [fontSize, setFontSize] = useState(32);
  
  // Panels
  const [showStickers, setShowStickers] = useState(false);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: "#111111",
      selection: true,
    });

    // Initialize brush
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushWidth;

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

  // Update brush settings
  useEffect(() => {
    if (!fabricCanvas?.freeDrawingBrush) return;
    fabricCanvas.freeDrawingBrush.color = brushColor;
    fabricCanvas.freeDrawingBrush.width = brushWidth;
  }, [fabricCanvas, brushColor, brushWidth]);

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

    // Enable drawing mode only for brush tool
    fabricCanvas.isDrawingMode = activeTool === "brush";
    
    // Enable selection for all tools except brush
    fabricCanvas.selection = activeTool === "select" || activeTool === "move" || activeTool === "delete";
    
    // Make all objects selectable and movable
    fabricCanvas.forEachObject((obj: FabricObject) => {
      obj.selectable = activeTool !== "brush";
      obj.evented = activeTool !== "brush";
    });

    // Mouse down for text tool
    const handleMouseDown = (e: { pointer?: { x: number; y: number } }) => {
      if (activeTool === "text" && e.pointer) {
        const text = new IText("Texte", {
          left: e.pointer.x,
          top: e.pointer.y,
          fontFamily: selectedFont,
          fontSize: fontSize,
          fill: textColor,
          editable: true,
          selectable: true,
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
  }, [activeTool, fabricCanvas, selectedFont, fontSize, textColor]);

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
        selectable: true,
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

  // Handle image upload
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const dataUrl = event.target?.result as string;
        const img = await FabricImage.fromURL(dataUrl);
        
        // Scale image to fit canvas
        const scale = Math.min(
          (canvasSize.width * 0.7) / (img.width || 1),
          (canvasSize.height * 0.7) / (img.height || 1)
        );
        
        img.scale(scale);
        img.set({
          left: canvasSize.width / 2,
          top: canvasSize.height / 2,
          originX: "center",
          originY: "center",
          selectable: true,
        });

        fabricCanvas.add(img);
        fabricCanvas.setActiveObject(img);
        fabricCanvas.renderAll();
        
        toast.success("Image uploadée !");
      } catch (err) {
        toast.error("Erreur lors du chargement de l'image");
        console.error(err);
      }
    };
    reader.readAsDataURL(file);
    
    // Reset input
    e.target.value = "";
  }, [fabricCanvas, canvasSize]);

  // Handle sticker selection
  const handleStickerSelect = useCallback(async (stickerUrl: string) => {
    if (!fabricCanvas) return;

    try {
      const img = await FabricImage.fromURL(stickerUrl);
      
      img.set({
        left: canvasSize.width / 2,
        top: canvasSize.height / 2,
        originX: "center",
        originY: "center",
        scaleX: 0.8,
        scaleY: 0.8,
        selectable: true,
      });

      fabricCanvas.add(img);
      fabricCanvas.setActiveObject(img);
      fabricCanvas.renderAll();
      
      toast.success("Sticker ajouté !");
    } catch (err) {
      toast.error("Erreur lors de l'ajout du sticker");
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
      {/* Hidden file input for uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

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
        onUploadClick={() => fileInputRef.current?.click()}
        onStickersClick={() => setShowStickers(!showStickers)}
        brushColor={brushColor}
        onBrushColorChange={setBrushColor}
        brushWidth={brushWidth}
        onBrushWidthChange={setBrushWidth}
        showBrushSettings={activeTool === "brush"}
      />

      {/* Text Tool Panel */}
      {activeTool === "text" && (
        <TextToolPanel
          selectedFont={selectedFont}
          onFontChange={setSelectedFont}
          textColor={textColor}
          onTextColorChange={setTextColor}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
        />
      )}

      {/* Canvas Container */}
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/30">
        {/* Stickers Panel */}
        {showStickers && (
          <StickersPanel
            onStickerSelect={handleStickerSelect}
            onClose={() => setShowStickers(false)}
          />
        )}

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
        <span>🖌️ Pinceau pour dessiner</span>
        <span>📝 Double-clic pour éditer le texte</span>
        <span>⌫ Suppr pour effacer</span>
      </div>
    </div>
  );
};
