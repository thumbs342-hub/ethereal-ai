import { Image, Mic, Shirt, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabType = "photo" | "voice" | "clothing" | "posters";

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "photo" as TabType, label: "Photo HD", icon: Image, cost: 20 },
  { id: "voice" as TabType, label: "Clonage Vocal", icon: Mic, cost: 100 },
  { id: "clothing" as TabType, label: "Look/Vêtements", icon: Shirt, cost: 30 },
  { id: "posters" as TabType, label: "Affiches/Flyers", icon: FileImage, cost: 40 },
];

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="w-full glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-start overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "tab-button flex items-center gap-2 whitespace-nowrap min-w-fit",
                  isActive && "active"
                )}
              >
                <Icon className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full transition-colors",
                  isActive 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {tab.cost}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
