import { cn } from "@/lib/utils";
import { Type } from "lucide-react";

interface TextToolPanelProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
  textColor: string;
  onTextColorChange: (color: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

const fonts = [
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Roboto", value: "'Roboto', sans-serif" },
  { name: "Pacifico", value: "'Pacifico', cursive" },
  { name: "Inter", value: "'Inter', sans-serif" },
  { name: "Playfair", value: "'Playfair Display', serif" },
  { name: "Montserrat", value: "'Montserrat', sans-serif" },
];

const colors = [
  "#D4A853", // Gold
  "#FFFFFF", // White
  "#EF4444", // Red
  "#22C55E", // Green
  "#3B82F6", // Blue
  "#A855F7", // Purple
  "#000000", // Black
];

const fontSizes = [16, 24, 32, 48, 64, 80];

export const TextToolPanel = ({
  selectedFont,
  onFontChange,
  textColor,
  onTextColorChange,
  fontSize,
  onFontSizeChange,
}: TextToolPanelProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-3 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl">
      {/* Font Selector */}
      <div className="flex items-center gap-2">
        <Type className="w-4 h-4 text-muted-foreground" />
        <select
          value={selectedFont}
          onChange={(e) => onFontChange(e.target.value)}
          className="px-2 py-1.5 rounded-lg bg-muted/30 border border-border/50 text-secondary-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/40"
        >
          {fonts.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Taille:</span>
        <div className="flex gap-1">
          {fontSizes.map((size) => (
            <button
              key={size}
              onClick={() => onFontSizeChange(size)}
              className={cn(
                "px-2 py-1 rounded text-xs transition-all",
                fontSize === size
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Text Color */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Couleur:</span>
        <div className="flex gap-1">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onTextColorChange(color)}
              className={cn(
                "w-5 h-5 rounded-full border-2 transition-all",
                textColor === color
                  ? "border-primary scale-110"
                  : "border-border/50 hover:scale-105"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
