import { useState } from "react";
import { Plus, X, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface Face {
  id: number;
  image: string | null;
  name: string;
}

const FaceManager = () => {
  const [faces, setFaces] = useState<Face[]>([
    { id: 1, image: null, name: "Visage 1" },
    { id: 2, image: null, name: "Visage 2" },
    { id: 3, image: null, name: "Visage 3" },
  ]);

  const handleUpload = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFaces(prev => prev.map(face => 
        face.id === id 
          ? { ...face, image: e.target?.result as string }
          : face
      ));
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (id: number) => {
    setFaces(prev => prev.map(face => 
      face.id === id 
        ? { ...face, image: null }
        : face
    ));
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <User className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-medium gold-text">Cameo Intégral</h3>
          <p className="text-sm text-muted-foreground">Jusqu'à 3 visages sauvegardés</p>
        </div>
      </div>

      {/* Zero Morphing Badge */}
      <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <Shield className="w-4 h-4 text-primary" />
        <span className="text-xs text-secondary-foreground">
          Règle d'Or : Identité 100% préservée — Zéro Morphing
        </span>
      </div>

      {/* Face Slots */}
      <div className="flex items-center justify-center gap-6">
        {faces.map((face) => (
          <div key={face.id} className="flex flex-col items-center gap-2">
            <div 
              className={cn(
                "face-slot cursor-pointer group",
                face.image && "filled"
              )}
            >
              {face.image ? (
                <>
                  <img 
                    src={face.image} 
                    alt={face.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemove(face.id)}
                    className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-5 h-5 text-destructive" />
                  </button>
                </>
              ) : (
                <label className="w-full h-full flex items-center justify-center cursor-pointer">
                  <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(face.id, file);
                    }}
                  />
                </label>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{face.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaceManager;
