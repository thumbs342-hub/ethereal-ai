import { CreditCard, Check, Zap } from "lucide-react";

interface PricingCardProps {
  onPurchase: () => void;
}

const features = [
  "Vidéos 30s Ultra-HD (133 crédits)",
  "Photos HD réalistes (20 crédits)",
  "Clonage vocal précis (100 crédits)",
  "Virtual Try-On (30 crédits)",
  "Affiches & Flyers HD (40 crédits)",
  "Sortie 'Ghost' — Zéro trace",
  "Cameo Intégral — 3 visages",
];

const PricingCard = ({ onPurchase }: PricingCardProps) => {
  return (
    <div className="glass-card rounded-2xl p-6 gold-glow">
      {/* Badge */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Pack Unique</span>
        </div>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-display text-5xl font-bold gold-text">200</span>
          <span className="text-2xl text-primary">€</span>
        </div>
        <p className="text-lg text-secondary-foreground mt-2">
          8 000 crédits
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          ≈ 60 vidéos ou 400 photos
        </p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm text-secondary-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onPurchase}
        className="btn-luxury w-full flex items-center justify-center gap-2"
      >
        <CreditCard className="w-5 h-5" />
        Acheter via FedaPay
      </button>

      {/* Payment Info */}
      <p className="text-xs text-center text-muted-foreground mt-4">
        Mobile Money • Cartes Bancaires • Paiement sécurisé
      </p>
    </div>
  );
};

export default PricingCard;
