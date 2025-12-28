import { useState, useRef, useCallback } from "react";
import { Plus, X, User, Shield, Camera, Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const [activeFaceId, setActiveFaceId] = useState<number | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleUpload = (id: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFaces(prev => prev.map(face => 
        face.id === id 
          ? { ...face, image: e.target?.result as string }
          : face
      ));
      toast.success("Photo importée avec succès");
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

  const startCamera = useCallback(async (faceId: number) => {
    setActiveFaceId(faceId);
    setShowCamera(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 640, height: 480 } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error("Impossible d'accéder à la caméra");
      setShowCamera(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setActiveFaceId(null);
    setIsScanning(false);
  }, []);

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !activeFaceId) return;
    
    setIsScanning(true);
    
    // Simulate scanning animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Flash effect
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 300);
    
    // Capture the image
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      
      // Auto-optimize brightness/contrast
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Simple brightness enhancement
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.1);     // R
        data[i + 1] = Math.min(255, data[i + 1] * 1.1); // G
        data[i + 2] = Math.min(255, data[i + 2] * 1.1); // B
      }
      ctx.putImageData(imageData, 0, 0);
      
      const imageUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      setFaces(prev => prev.map(face => 
        face.id === activeFaceId 
          ? { ...face, image: imageUrl }
          : face
      ));
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success("Scan facial réussi !");
    stopCamera();
  }, [activeFaceId, stopCamera]);

  return (
    <>
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
                  <div className="w-full h-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              {!face.image && (
                <div className="flex gap-2">
                  <label className="cursor-pointer p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors" title="Importer une photo">
                    <Upload className="w-4 h-4 text-primary" />
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
                  <button 
                    onClick={() => startCamera(face.id)}
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                    title="Scanner mon visage"
                  >
                    <Camera className="w-4 h-4 text-primary" />
                  </button>
                </div>
              )}
              
              <span className="text-xs text-muted-foreground">{face.name}</span>
            </div>
          ))}
        </div>

        {/* Labels */}
        <div className="flex justify-center gap-8 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Upload className="w-3 h-3" />
            <span>Importer une photo</span>
          </div>
          <div className="flex items-center gap-1">
            <Camera className="w-3 h-3" />
            <span>Scanner mon visage</span>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4">
          {/* Golden Flash Effect */}
          {showFlash && (
            <div className="absolute inset-0 bg-primary/50 z-50 animate-pulse" />
          )}
          
          <div className="relative w-full max-w-lg">
            {/* Close Button */}
            <button 
              onClick={stopCamera}
              className="absolute -top-12 right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Camera Container */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/50">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                className="w-full aspect-[4/3] object-cover bg-background"
              />
              
              {/* Golden Circle Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={cn(
                  "w-64 h-64 rounded-full border-4 border-primary/70 transition-all duration-500",
                  isScanning && "border-primary animate-pulse scale-105"
                )}>
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                </div>
              </div>

              {/* Scanning Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
                    <p className="text-sm gold-text font-medium">
                      Analyse des traits par la Forge en cours...
                    </p>
                  </div>
                </div>
              )}
              
              {/* Scan Line */}
              {isScanning && (
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-vertical" />
              )}
            </div>

            {/* Capture Button */}
            {!isScanning && (
              <button
                onClick={capturePhoto}
                className="btn-luxury w-full mt-4 flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Capturer
              </button>
            )}

            {/* Hidden Canvas for capture */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
    </>
  );
};

export default FaceManager;