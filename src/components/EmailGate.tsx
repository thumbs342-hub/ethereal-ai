import { useState } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";

interface EmailGateProps {
  onSubmit: (email: string) => void;
  logoUrl?: string;
}

const EmailGate = ({ onSubmit, logoUrl }: EmailGateProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Veuillez entrer votre email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email invalide");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call to save email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store in localStorage for now (would be database in production)
    const visitors = JSON.parse(localStorage.getItem('kpogo_visitors') || '[]');
    visitors.push({
      email,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });
    localStorage.setItem('kpogo_visitors', JSON.stringify(visitors));

    setIsSubmitting(false);
    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Gate Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-card rounded-2xl p-8 text-center gold-glow">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="KPOGO" 
                className="w-24 h-24 object-contain"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center gold-glow">
                <span className="font-display font-bold text-3xl text-primary-foreground">K</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="font-display text-2xl md:text-3xl font-bold gold-text mb-2">
            Entrer dans la Forge
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Accédez à l'infrastructure IA la plus avancée
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email professionnel"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive text-left">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-luxury w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Vérification...
                </>
              ) : (
                <>
                  Accéder à KPOGO
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground mt-6">
            En continuant, vous acceptez nos conditions d'utilisation.
            <br />
            Vos données sont protégées et chiffrées.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailGate;
