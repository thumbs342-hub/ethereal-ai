import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navigation, { TabType } from "@/components/Navigation";
import FaceManager from "@/components/FaceManager";
import GeneratorPanel from "@/components/GeneratorPanel";
import PricingCard from "@/components/PricingCard";
import SecurityBanner from "@/components/SecurityBanner";
import LoadingScreen from "@/components/LoadingScreen";
import EmailGate from "@/components/EmailGate";
import PartnerMarquee from "@/components/PartnerMarquee";
import { CreativeStudio } from "@/components/canvas";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import logoKpogo from "@/assets/logo_kpogo.png";

const Index = () => {
  const [credits, setCredits] = useState(8000);
  const [activeTab, setActiveTab] = useState<TabType>("photo");
  const [currentLang, setCurrentLang] = useState("fr");
  
  // App states
  const [isLoading, setIsLoading] = useState(true);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user already entered email
    const savedEmail = localStorage.getItem('kpogo_user_email');
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
    // Check saved language
    const savedLang = localStorage.getItem('kpogo_lang');
    if (savedLang) {
      setCurrentLang(savedLang);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (!userEmail) {
      setShowEmailGate(true);
    }
  };

  const handleEmailSubmit = (email: string) => {
    localStorage.setItem('kpogo_user_email', email);
    setUserEmail(email);
    setShowEmailGate(false);
    toast.success("Bienvenue dans la Golden Identity Forge !", {
      description: "Votre accès a été activé.",
    });
  };

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    localStorage.setItem('kpogo_lang', code);
    toast.info(`Langue: ${code.toUpperCase()}`, {
      description: "Interface mise à jour",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('kpogo_user_email');
    setUserEmail(null);
    setShowEmailGate(true);
    toast.info("Déconnexion réussie", {
      description: "À bientôt dans la Forge !",
    });
  };

  const handleGenerate = (cost: number) => {
    setCredits(prev => Math.max(0, prev - cost));
    toast.success("Génération terminée !", {
      description: `${cost} crédits utilisés. Fichier prêt.`,
    });
  };

  const handlePurchase = () => {
    toast.info("Validation de la Forge en cours...", {
      description: "Sécurisation de l'Accès",
    });
    // Would redirect to payment gateway
  };

  // Loading Screen
  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} logoUrl={logoKpogo} />;
  }

  // Email Gate
  if (showEmailGate) {
    return <EmailGate onSubmit={handleEmailSubmit} logoUrl={logoKpogo} onLanguageChange={handleLanguageChange} />;
  }

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
      
      {/* Header with Credits & Language */}
      <Header 
        credits={credits} 
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        logoUrl={logoKpogo}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Navigation Tabs */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Content Area - Compact spacing */}
        <div className="container mx-auto px-4 py-4">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-4 stagger-children">
              {/* Face Manager */}
              <FaceManager />
              
              {/* Creative Studio for posters tab */}
              {activeTab === "posters" ? (
                <CreativeStudio />
              ) : (
                <GeneratorPanel 
                  activeTab={activeTab}
                  credits={credits}
                  onGenerate={handleGenerate}
                />
              )}
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-4 stagger-children">
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
        
        {/* Partner Marquee */}
        <PartnerMarquee />
        
        {/* Footer */}
        <footer className="border-t border-border/30 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 KPOGO — Infrastructure IA de Production Élite
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              Développé par l'équipe KPOGO • Paiements sécurisés
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
