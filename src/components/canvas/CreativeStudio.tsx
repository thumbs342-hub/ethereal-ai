import { FabricCanvasEditor } from "./FabricCanvas";

export const CreativeStudio = () => {
  return (
    <div className="glass-card rounded-2xl p-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-secondary-foreground mb-1">
            Studio Créatif
          </h2>
          <p className="text-xs text-muted-foreground">
            Éditeur interactif avec génération IA
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-xs font-medium text-primary">Fabric.js + Pollinations</span>
        </div>
      </div>

      {/* Canvas Editor */}
      <FabricCanvasEditor width={800} height={500} />
    </div>
  );
};

export default CreativeStudio;
