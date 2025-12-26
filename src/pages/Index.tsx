import { useState } from "react";
import Header from "@/components/Header";
import Navigation, { TabType } from "@/components/Navigation";
import FaceManager from "@/components/FaceManager";
import GeneratorPanel from "@/components/GeneratorPanel";
import PricingCard from "@/components/PricingCard";
import SecurityBanner from "@/components/SecurityBanner";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const Index = () => {
  const [credits, setCredits] = useState(8000);
  const [activeTab, setActiveTab] = useState<TabType>("video");

  const handleGenerate = (cost: number) => {
    setCredits(prev => Math.max(0, prev - cost));
    toast.success("Génération terminée !", {
      description: `${cost} crédits utilisés. Sortie 'Ghost' prête.`,
    });
  };

  const handlePurchase = () => {
    toast.info("Redirection vers FedaPay...", {
      description: "Paiement sécurisé par Mobile Money ou Carte Bancaire",
    });
    // Would redirect to FedaPay
  };

  return (
    <div className="min-h-screen">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'hsl(0 0% 4%)',
            border: '1px solid hsl(43 67% 53% / 0.2)',
            color: 'hsl(45 43% 53%)',
          },
        }}
      />
      
      {/* Header with Credits */}
      <Header credits={credits} />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Navigation Tabs */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Content Area */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6 stagger-children">
              {/* Face Manager */}
              <FaceManager />
              
              {/* Generator Panel */}
              <GeneratorPanel 
                activeTab={activeTab}
                credits={credits}
                onGenerate={handleGenerate}
              />
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-6 stagger-children">
              {/* Pricing Card */}
              <PricingCard onPurchase={handlePurchase} />
              
              {/* Security Banner */}
              <SecurityBanner />
              
              {/* Specs Info */}
              <div className="glass-card rounded-xl p-4">
                <h4 className="font-display text-sm font-medium gold-text mb-3">
                  Spécifications Techniques
                </h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Vidéos 30s Ultra-HD 4K
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Textures peau 'Raw' réalistes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Optimisé réseau 2G/3G
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Compatible tous continents
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="border-t border-border/30 py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 KPOGO — Infrastructure IA de Production Élite
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Paiements sécurisés par FedaPay • API RunPod & Supabase
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
