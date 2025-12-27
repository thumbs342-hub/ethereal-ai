import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  logoUrl?: string;
}

const LoadingScreen = ({ onComplete, logoUrl }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progress animation over 3 seconds
    const duration = 3000;
    const interval = 50;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    // Show logo at 50%
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 1500);

    // Fade out and complete
    const completeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 800);
    }, 3500);

    return () => {
      clearInterval(timer);
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Particle Container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gold Particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Smoke/Mist Effect */}
        <div className="smoke-layer smoke-1" />
        <div className="smoke-layer smoke-2" />
        <div className="smoke-layer smoke-3" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Reveal */}
        <div 
          className={`logo-container transition-all duration-1000 ${
            showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="KPOGO" 
              className="w-32 h-32 md:w-48 md:h-48 object-contain gold-glow-strong"
            />
          ) : (
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gold-gradient flex items-center justify-center gold-glow-strong">
              <span className="font-display font-bold text-5xl md:text-7xl text-primary-foreground">K</span>
            </div>
          )}
        </div>

        {/* Brand Name */}
        <h1 
          className={`font-display text-3xl md:text-5xl font-bold gold-text mt-6 tracking-wider transition-all duration-1000 delay-300 ${
            showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          KPOGO
        </h1>

        {/* Tagline */}
        <p 
          className={`text-muted-foreground text-sm md:text-base mt-2 transition-all duration-1000 delay-500 ${
            showLogo ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Infrastructure IA de Production Élite
        </p>

        {/* Progress Bar */}
        <div className="w-48 md:w-64 mt-8">
          <div className="progress-luxury h-1">
            <div 
              className="progress-luxury-bar transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Scan Line Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="loading-scan-line" />
      </div>
    </div>
  );
};

export default LoadingScreen;
