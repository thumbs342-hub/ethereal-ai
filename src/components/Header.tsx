import { Coins } from "lucide-react";

interface HeaderProps {
  credits: number;
}

const Header = ({ credits }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center gold-glow">
            <span className="font-display font-bold text-lg text-primary-foreground">K</span>
          </div>
          <h1 className="font-display text-xl font-semibold gold-text tracking-wide">
            KPOGO
          </h1>
        </div>

        {/* Credit Counter */}
        <div className="credit-badge pulse-glow">
          <Coins className="w-4 h-4 text-primary" />
          <span className="gold-text font-semibold">
            {credits.toLocaleString('fr-FR')} Crédits
          </span>
        </div>
      </div>

      {/* Scan Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px scan-line" />
    </header>
  );
};

export default Header;
