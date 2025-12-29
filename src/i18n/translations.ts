export type SupportedLang = "fr" | "en";

export const SUPPORTED_LANGS: SupportedLang[] = ["fr", "en"];

export const STORAGE_LANG_KEY = "kpogo_lang";

export const localeByLang: Record<SupportedLang, string> = {
  fr: "fr-FR",
  en: "en-GB",
};

export type TranslationKey =
  | "brand.tagline"
  | "header.credits"
  | "header.logout"
  | "emailGate.subtitle"
  | "emailGate.placeholder"
  | "emailGate.error.required"
  | "emailGate.error.invalid"
  | "emailGate.button.enter"
  | "emailGate.button.validating"
  | "emailGate.privacy.line1"
  | "emailGate.privacy.line2"
  | "toast.welcome.title"
  | "toast.welcome.desc"
  | "toast.lang.title"
  | "toast.lang.desc"
  | "toast.logout.title"
  | "toast.logout.desc"
  | "toast.generation.title"
  | "toast.generation.desc"
  | "toast.payment.title"
  | "toast.payment.desc"
  | "spec.title"
  | "spec.video4k"
  | "spec.skin"
  | "spec.network"
  | "spec.continents"
  | "footer.line1"
  | "footer.line2"
  | "nav.video"
  | "nav.photo"
  | "nav.voice"
  | "nav.clothing"
  | "nav.posters"
  | "tab.video.title"
  | "tab.video.desc"
  | "tab.video.placeholder"
  | "tab.video.fileLabel"
  | "tab.photo.title"
  | "tab.photo.desc"
  | "tab.photo.placeholder"
  | "tab.photo.fileLabel"
  | "tab.voice.title"
  | "tab.voice.desc"
  | "tab.voice.placeholder"
  | "tab.voice.fileLabel"
  | "tab.clothing.title"
  | "tab.clothing.desc"
  | "tab.clothing.placeholder"
  | "tab.clothing.fileLabel"
  | "tab.posters.title"
  | "tab.posters.desc"
  | "tab.posters.placeholder"
  | "tab.posters.fileLabel"
  | "generator.credits"
  | "generator.result"
  | "generator.download"
  | "generator.resultAlt"
  | "generator.outputGhost"
  | "generator.uploadHint"
  | "generator.generating"
  | "generator.progress"
  | "generator.insufficientCredits"
  | "generator.newCreation"
  | "generator.generate"
  | "generator.generateInProgress"
  | "pricing.badge"
  | "pricing.credits"
  | "pricing.approx"
  | "pricing.cta"
  | "pricing.paymentInfo"
  | "pricing.feature.video"
  | "pricing.feature.photo"
  | "pricing.feature.voice"
  | "pricing.feature.clothing"
  | "pricing.feature.posters"
  | "pricing.feature.support"
  | "security.title"
  | "security.desc"
  | "loading.text";

const translations: Record<SupportedLang, Record<TranslationKey, string>> = {
  fr: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "Crédits",
    "header.logout": "Déconnexion",
    "emailGate.subtitle": "Accédez à la forge d'identité premium",
    "emailGate.placeholder": "Votre adresse email",
    "emailGate.error.required": "Email requis",
    "emailGate.error.invalid": "Email invalide",
    "emailGate.button.enter": "ENTRER DANS LA FORGE KPOGO",
    "emailGate.button.validating": "Validation...",
    "emailGate.privacy.line1": "Vos données sont protégées",
    "emailGate.privacy.line2": "Connexion sécurisée",
    "toast.welcome.title": "Bienvenue",
    "toast.welcome.desc": "Vous êtes connecté",
    "toast.lang.title": "Langue",
    "toast.lang.desc": "Langue modifiée",
    "toast.logout.title": "Déconnexion",
    "toast.logout.desc": "À bientôt",
    "toast.generation.title": "Génération",
    "toast.generation.desc": "Votre contenu est prêt",
    "toast.payment.title": "Paiement",
    "toast.payment.desc": "Transaction effectuée",
    "spec.title": "Spécifications",
    "spec.video4k": "Vidéo 4K Ultra HD",
    "spec.skin": "Analyse cutanée IA",
    "spec.network": "Réseau mondial",
    "spec.continents": "5 continents",
    "footer.line1": "KPOGO © 2024",
    "footer.line2": "Tous droits réservés",
    "nav.video": "Vidéo",
    "nav.photo": "Photo",
    "nav.voice": "Voix",
    "nav.clothing": "Vêtements",
    "nav.posters": "Affiches",
    "tab.video.title": "Génération Vidéo",
    "tab.video.desc": "Créez des vidéos ultra-réalistes",
    "tab.video.placeholder": "Décrivez votre vidéo...",
    "tab.video.fileLabel": "Importer une vidéo",
    "tab.photo.title": "Génération Photo",
    "tab.photo.desc": "Portraits haute définition",
    "tab.photo.placeholder": "Décrivez votre photo...",
    "tab.photo.fileLabel": "Importer une photo",
    "tab.voice.title": "Clonage Vocal",
    "tab.voice.desc": "Reproduisez n'importe quelle voix",
    "tab.voice.placeholder": "Texte à convertir...",
    "tab.voice.fileLabel": "Importer un audio",
    "tab.clothing.title": "Essayage Virtuel",
    "tab.clothing.desc": "Essayez des vêtements en IA",
    "tab.clothing.placeholder": "Décrivez le style...",
    "tab.clothing.fileLabel": "Importer une image",
    "tab.posters.title": "Création Affiches",
    "tab.posters.desc": "Designs professionnels",
    "tab.posters.placeholder": "Décrivez l'affiche...",
    "tab.posters.fileLabel": "Importer un design",
    "generator.credits": "crédits",
    "generator.result": "Résultat",
    "generator.download": "Télécharger",
    "generator.resultAlt": "Résultat généré",
    "generator.outputGhost": "Votre création apparaîtra ici",
    "generator.uploadHint": "Glissez ou cliquez pour importer",
    "generator.generating": "Génération en cours...",
    "generator.progress": "Progression",
    "generator.insufficientCredits": "Crédits insuffisants",
    "generator.newCreation": "Nouvelle création",
    "generator.generate": "Générer",
    "generator.generateInProgress": "Génération...",
    "pricing.badge": "Premium",
    "pricing.credits": "crédits",
    "pricing.approx": "environ",
    "pricing.cta": "Acheter",
    "pricing.paymentInfo": "Paiement sécurisé",
    "pricing.feature.video": "Vidéos illimitées",
    "pricing.feature.photo": "Photos HD",
    "pricing.feature.voice": "Clonage vocal",
    "pricing.feature.clothing": "Essayage virtuel",
    "pricing.feature.posters": "Création d'affiches",
    "pricing.feature.support": "Support prioritaire",
    "security.title": "Sécurité",
    "security.desc": "Données chiffrées",
    "loading.text": "Chargement...",
  },
  en: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "Credits",
    "header.logout": "Logout",
    "emailGate.subtitle": "Access the premium identity forge",
    "emailGate.placeholder": "Your email address",
    "emailGate.error.required": "Email required",
    "emailGate.error.invalid": "Invalid email",
    "emailGate.button.enter": "ENTER THE KPOGO FORGE",
    "emailGate.button.validating": "Validating...",
    "emailGate.privacy.line1": "Your data is protected",
    "emailGate.privacy.line2": "Secure connection",
    "toast.welcome.title": "Welcome",
    "toast.welcome.desc": "You are logged in",
    "toast.lang.title": "Language",
    "toast.lang.desc": "Language changed",
    "toast.logout.title": "Logout",
    "toast.logout.desc": "See you soon",
    "toast.generation.title": "Generation",
    "toast.generation.desc": "Your content is ready",
    "toast.payment.title": "Payment",
    "toast.payment.desc": "Transaction completed",
    "spec.title": "Specifications",
    "spec.video4k": "4K Ultra HD Video",
    "spec.skin": "AI Skin Analysis",
    "spec.network": "Global Network",
    "spec.continents": "5 continents",
    "footer.line1": "KPOGO © 2024",
    "footer.line2": "All rights reserved",
    "nav.video": "Video",
    "nav.photo": "Photo",
    "nav.voice": "Voice",
    "nav.clothing": "Clothing",
    "nav.posters": "Posters",
    "tab.video.title": "Video Generation",
    "tab.video.desc": "Create ultra-realistic videos",
    "tab.video.placeholder": "Describe your video...",
    "tab.video.fileLabel": "Import a video",
    "tab.photo.title": "Photo Generation",
    "tab.photo.desc": "High definition portraits",
    "tab.photo.placeholder": "Describe your photo...",
    "tab.photo.fileLabel": "Import a photo",
    "tab.voice.title": "Voice Cloning",
    "tab.voice.desc": "Reproduce any voice",
    "tab.voice.placeholder": "Text to convert...",
    "tab.voice.fileLabel": "Import audio",
    "tab.clothing.title": "Virtual Try-On",
    "tab.clothing.desc": "Try clothes with AI",
    "tab.clothing.placeholder": "Describe the style...",
    "tab.clothing.fileLabel": "Import an image",
    "tab.posters.title": "Poster Creation",
    "tab.posters.desc": "Professional designs",
    "tab.posters.placeholder": "Describe the poster...",
    "tab.posters.fileLabel": "Import a design",
    "generator.credits": "credits",
    "generator.result": "Result",
    "generator.download": "Download",
    "generator.resultAlt": "Generated result",
    "generator.outputGhost": "Your creation will appear here",
    "generator.uploadHint": "Drag or click to import",
    "generator.generating": "Generating...",
    "generator.progress": "Progress",
    "generator.insufficientCredits": "Insufficient credits",
    "generator.newCreation": "New creation",
    "generator.generate": "Generate",
    "generator.generateInProgress": "Generating...",
    "pricing.badge": "Premium",
    "pricing.credits": "credits",
    "pricing.approx": "approximately",
    "pricing.cta": "Buy",
    "pricing.paymentInfo": "Secure payment",
    "pricing.feature.video": "Unlimited videos",
    "pricing.feature.photo": "HD Photos",
    "pricing.feature.voice": "Voice cloning",
    "pricing.feature.clothing": "Virtual try-on",
    "pricing.feature.posters": "Poster creation",
    "pricing.feature.support": "Priority support",
    "security.title": "Security",
    "security.desc": "Encrypted data",
    "loading.text": "Loading...",
  },
};

export const t = (lang: SupportedLang, key: TranslationKey): string => {
  return translations[lang]?.[key] || translations.fr[key] || key;
};

export const getLangFromStorage = (): SupportedLang => {
  const stored = localStorage.getItem(STORAGE_LANG_KEY);
  if (stored && SUPPORTED_LANGS.includes(stored as SupportedLang)) {
    return stored as SupportedLang;
  }
  return "fr";
};

export const setLangToStorage = (lang: SupportedLang): void => {
  localStorage.setItem(STORAGE_LANG_KEY, lang);
};
