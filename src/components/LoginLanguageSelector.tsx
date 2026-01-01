import { useState, useRef, useEffect, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

export interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
];

interface LoginLanguageSelectorProps {
  currentLang: string;
  onLanguageChange: (code: string) => void;
}

const LoginLanguageSelector = forwardRef<HTMLDivElement, LoginLanguageSelectorProps>(
  ({ currentLang, onLanguageChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative w-full" ref={ref || dropdownRef}>
        <div ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-all"
          >
            <span className="text-sm text-foreground">{currentLanguage.name}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 max-h-60 overflow-y-auto glass-card rounded-xl border border-border/50 py-2 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${
                    lang.code === currentLang ? 'text-primary bg-primary/5' : 'text-foreground'
                  }`}
                >
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

LoginLanguageSelector.displayName = "LoginLanguageSelector";

export default LoginLanguageSelector;
