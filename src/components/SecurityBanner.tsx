import { Shield, Lock, Eye } from "lucide-react";

const SecurityBanner = () => {
  return (
    <div className="glass-card rounded-xl p-4 border-primary/20">
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Anti-Fraude IP</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Données chiffrées</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Sortie Ghost — Zéro trace</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBanner;
