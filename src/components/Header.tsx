import { Coins, LogOut } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

interface HeaderProps {
  credits: number;
  currentLang: string;
  onLanguageChange: (code: string) => void;
  logoUrl?: string;
  onLogout?: () => void;
}

const Header = ({ credits, currentLang, onLanguageChange, logoUrl, onLogout }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt="KPOGO" className="w-10 h-10 object-contain" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center gold-glow">
              <span className="font-display font-bold text-lg text-primary-foreground">K</span>
            </div>
          )}
          <h1 className="font-display text-xl font-semibold gold-text tracking-wide">
            KPOGO
          </h1>
        </div>

        {/* Right Side: Credits + Language + Logout */}
        <div className="flex items-center gap-3">
          {/* Credit Counter */}
          <div className="credit-badge pulse-glow">
            <Coins className="w-4 h-4 text-primary" />
            <span className="gold-text font-semibold">
              {credits.toLocaleString('fr-FR')} Crédits
            </span>
          </div>

          {/* Language Selector */}
          <LanguageSelector 
            currentLang={currentLang} 
            onLanguageChange={onLanguageChange} 
          />

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 rounded-lg bg-muted/50 border border-border/50 hover:border-destructive/50 hover:bg-destructive/10 transition-all group"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4 text-muted-foreground group-hover:text-destructive transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Scan Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px scan-line" />
    </header>
  );
};

export default Header;
