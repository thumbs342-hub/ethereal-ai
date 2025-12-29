export type SupportedLang = "fr" | "en" | "es" | "de" | "pt" | "it" | "ar" | "zh" | "ja";

export const SUPPORTED_LANGS: SupportedLang[] = [
  "fr",
  "en",
  "es",
  "de",
  "pt",
  "it",
  "ar",
  "zh",
  "ja",
];

export const STORAGE_LANG_KEY = "kpogo_lang";

export const localeByLang: Record<SupportedLang, string> = {
  fr: "fr-FR",
  en: "en-GB",
  es: "es-ES",
  de: "de-DE",
  pt: "pt-PT",
  it: "it-IT",
  ar: "ar-SA",
  zh: "zh-CN",
  ja: "ja-JP",
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
  | "pricing.feature.photos"
  | "pricing.feature.voice"
  | "pricing.feature.tryOn"
  | "pricing.feature.posters"
  | "pricing.feature.ghost"
  | "pricing.feature.cameo"
  | "security.antiFraud"
  | "security.encrypted"
  | "security.ghost"
  | "face.title"
  | "face.subtitle"
  | "face.rule"
  | "face.slot"
  | "face.uploadSuccess"
  | "face.cameraError"
  | "face.scanSuccess"
  | "face.importTooltip"
  | "face.scanTooltip"
  | "face.importLabel"
  | "face.scanLabel"
  | "face.capture"
  | "face.scanning"
  | "notFound.message"
  | "notFound.back";

export const translations: Record<SupportedLang, Record<TranslationKey, string>> = {
  fr: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "Crédits",
    "header.logout": "Déconnexion",

    "emailGate.subtitle": "Accédez à l'infrastructure IA la plus avancée",
    "emailGate.placeholder": "Votre email professionnel",
    "emailGate.error.required": "Veuillez entrer votre email",
    "emailGate.error.invalid": "Email invalide",
    "emailGate.button.enter": "ENTRER DANS LA FORGE KPOGO",
    "emailGate.button.validating": "Validation de la Forge...",
    "emailGate.privacy.line1": "En continuant, vous acceptez nos conditions d'utilisation.",
    "emailGate.privacy.line2": "Vos données sont protégées et chiffrées.",

    "toast.welcome.title": "Bienvenue dans la Golden Identity Forge !",
    "toast.welcome.desc": "Votre accès a été activé.",
    "toast.lang.title": "Langue : {lang}",
    "toast.lang.desc": "Interface mise à jour",
    "toast.logout.title": "Déconnexion réussie",
    "toast.logout.desc": "À bientôt dans la Forge !",
    "toast.generation.title": "Génération terminée !",
    "toast.generation.desc": "{cost} crédits utilisés. Fichier prêt.",
    "toast.payment.title": "Validation de la Forge en cours...",
    "toast.payment.desc": "Sécurisation de l'Accès",

    "spec.title": "Spécifications Techniques",
    "spec.video4k": "Vidéos 30s Ultra-HD 4K",
    "spec.skin": "Textures peau 'Raw' réalistes",
    "spec.network": "Optimisé réseau 2G/3G",
    "spec.continents": "Compatible tous continents",

    "footer.line1": "© 2024 KPOGO — Infrastructure IA de Production Élite",
    "footer.line2": "Développé par l'équipe KPOGO • Paiements sécurisés",

    "nav.video": "Vidéo 30s",
    "nav.photo": "Photo HD",
    "nav.voice": "Clonage Vocal",
    "nav.clothing": "Look/Vêtements",
    "nav.posters": "Affiches/Flyers",

    "tab.video.title": "Générateur Vidéo 30s",
    "tab.video.desc": "Créez des vidéos ultra-réalistes de 30 secondes avec vos visages",
    "tab.video.placeholder": "Décrivez votre scène vidéo... Ex: Un homme en costume marchant dans une ville futuriste au coucher du soleil",
    "tab.video.fileLabel": "Vidéo ou image de référence",

    "tab.photo.title": "Générateur Photo HD",
    "tab.photo.desc": "Photos ultra-haute résolution avec textures de peau réalistes",
    "tab.photo.placeholder": "Décrivez votre photo... Ex: Portrait professionnel en studio avec éclairage dramatique",
    "tab.photo.fileLabel": "Image de référence",

    "tab.voice.title": "Clonage Vocal",
    "tab.voice.desc": "Clonez votre voix exacte à partir d'un échantillon audio",
    "tab.voice.placeholder": "Texte à prononcer avec la voix clonée...",
    "tab.voice.fileLabel": "Échantillon vocal (min. 30s)",

    "tab.clothing.title": "Virtual Try-On",
    "tab.clothing.desc": "Changez les vêtements sans altérer le corps",
    "tab.clothing.placeholder": "Décrivez le style vestimentaire souhaité... Ex: Costume trois-pièces noir avec cravate dorée",
    "tab.clothing.fileLabel": "Photo avec vêtements à modifier",

    "tab.posters.title": "Studio Affiches & Flyers",
    "tab.posters.desc": "Créez des visuels marketing HD professionnels",
    "tab.posters.placeholder": "Décrivez votre affiche... Ex: Affiche de concert style néon avec artiste au centre",
    "tab.posters.fileLabel": "Image de base (optionnel)",

    "generator.credits": "crédits",
    "generator.result": "Résultat",
    "generator.download": "Télécharger",
    "generator.resultAlt": "Résultat",
    "generator.outputGhost": "Sortie 'Ghost' — Aucun logo, aucune signature, aucune méta-donnée",
    "generator.uploadHint": "Glissez ou cliquez pour uploader",
    "generator.generating": "Génération en cours...",
    "generator.progress": "{progress}%",
    "generator.insufficientCredits": "Crédits insuffisants. Vous avez besoin de {cost} crédits.",
    "generator.newCreation": "Nouvelle création",
    "generator.generate": "Générer",
    "generator.generateInProgress": "Génération...",

    "pricing.badge": "Pack Unique",
    "pricing.credits": "8 000 crédits",
    "pricing.approx": "≈ 60 vidéos ou 400 photos",
    "pricing.cta": "Acheter Maintenant",
    "pricing.paymentInfo": "Mobile Money • Cartes Bancaires • Paiement sécurisé",
    "pricing.feature.video": "Vidéos 30s Ultra-HD (133 crédits)",
    "pricing.feature.photos": "Photos HD réalistes (20 crédits)",
    "pricing.feature.voice": "Clonage vocal précis (100 crédits)",
    "pricing.feature.tryOn": "Virtual Try-On (30 crédits)",
    "pricing.feature.posters": "Affiches & Flyers HD (40 crédits)",
    "pricing.feature.ghost": "Sortie 'Ghost' — Zéro trace",
    "pricing.feature.cameo": "Cameo Intégral — 3 visages",

    "security.antiFraud": "Anti-Fraude IP",
    "security.encrypted": "Données chiffrées",
    "security.ghost": "Sortie Ghost — Zéro trace",

    "face.title": "Cameo Intégral",
    "face.subtitle": "Jusqu'à 3 visages sauvegardés",
    "face.rule": "Règle d'Or : Identité 100% préservée — Zéro Morphing",
    "face.slot": "Visage {n}",
    "face.uploadSuccess": "Photo importée avec succès",
    "face.cameraError": "Impossible d'accéder à la caméra",
    "face.scanSuccess": "Scan facial réussi !",
    "face.importTooltip": "Importer une photo",
    "face.scanTooltip": "Scanner mon visage",
    "face.importLabel": "Importer une photo",
    "face.scanLabel": "Scanner mon visage",
    "face.capture": "Capturer",
    "face.scanning": "Analyse des traits par la Forge en cours...",

    "notFound.message": "Page introuvable",
    "notFound.back": "Retour à l'accueil",
  },

  en: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "Credits",
    "header.logout": "Logout",

    "emailGate.subtitle": "Access the most advanced AI infrastructure",
    "emailGate.placeholder": "Your professional email",
    "emailGate.error.required": "Please enter your email",
    "emailGate.error.invalid": "Invalid email",
    "emailGate.button.enter": "ENTER THE KPOGO FORGE",
    "emailGate.button.validating": "Forge validation...",
    "emailGate.privacy.line1": "By continuing, you agree to our terms of use.",
    "emailGate.privacy.line2": "Your data is protected and encrypted.",

    "toast.welcome.title": "Welcome to the Golden Identity Forge!",
    "toast.welcome.desc": "Your access has been activated.",
    "toast.lang.title": "Language: {lang}",
    "toast.lang.desc": "Interface updated",
    "toast.logout.title": "Logged out",
    "toast.logout.desc": "See you soon in the Forge!",
    "toast.generation.title": "Generation complete!",
    "toast.generation.desc": "{cost} credits used. File ready.",
    "toast.payment.title": "Forge validation in progress...",
    "toast.payment.desc": "Access secured",

    "spec.title": "Technical Specs",
    "spec.video4k": "30s Ultra-HD 4K videos",
    "spec.skin": "Realistic 'Raw' skin textures",
    "spec.network": "Optimized for 2G/3G",
    "spec.continents": "Worldwide compatible",

    "footer.line1": "© 2024 KPOGO — Elite AI Identity Infrastructure",
    "footer.line2": "Built by the KPOGO team • Secure payments",

    "nav.video": "30s Video",
    "nav.photo": "HD Photo",
    "nav.voice": "Voice Clone",
    "nav.clothing": "Clothing",
    "nav.posters": "Posters",

    "tab.video.title": "30s Video Generator",
    "tab.video.desc": "Create ultra-realistic 30-second videos with your faces",
    "tab.video.placeholder": "Describe your video scene... e.g., A man in a suit walking in a futuristic city at sunset",
    "tab.video.fileLabel": "Reference video or image",

    "tab.photo.title": "HD Photo Generator",
    "tab.photo.desc": "Ultra-high resolution photos with realistic skin textures",
    "tab.photo.placeholder": "Describe your photo... e.g., Professional studio portrait with dramatic lighting",
    "tab.photo.fileLabel": "Reference image",

    "tab.voice.title": "Voice Cloning",
    "tab.voice.desc": "Clone your exact voice from an audio sample",
    "tab.voice.placeholder": "Text to speak with the cloned voice...",
    "tab.voice.fileLabel": "Voice sample (min. 30s)",

    "tab.clothing.title": "Virtual Try-On",
    "tab.clothing.desc": "Change clothes without altering the body",
    "tab.clothing.placeholder": "Describe the desired outfit... e.g., Black three-piece suit with a gold tie",
    "tab.clothing.fileLabel": "Photo to modify",

    "tab.posters.title": "Poster & Flyer Studio",
    "tab.posters.desc": "Create professional HD marketing visuals",
    "tab.posters.placeholder": "Describe your poster... e.g., Neon concert poster with artist centered",
    "tab.posters.fileLabel": "Base image (optional)",

    "generator.credits": "credits",
    "generator.result": "Result",
    "generator.download": "Download",
    "generator.resultAlt": "Result",
    "generator.outputGhost": "Ghost output — No logo, no signature, no metadata",
    "generator.uploadHint": "Drag or click to upload",
    "generator.generating": "Generating...",
    "generator.progress": "{progress}%",
    "generator.insufficientCredits": "Not enough credits. You need {cost} credits.",
    "generator.newCreation": "New creation",
    "generator.generate": "Generate",
    "generator.generateInProgress": "Generating...",

    "pricing.badge": "Single Pack",
    "pricing.credits": "8,000 credits",
    "pricing.approx": "≈ 60 videos or 400 photos",
    "pricing.cta": "Buy Now",
    "pricing.paymentInfo": "Mobile Money • Cards • Secure payment",
    "pricing.feature.video": "30s Ultra-HD videos (133 credits)",
    "pricing.feature.photos": "Realistic HD photos (20 credits)",
    "pricing.feature.voice": "Accurate voice cloning (100 credits)",
    "pricing.feature.tryOn": "Virtual Try-On (30 credits)",
    "pricing.feature.posters": "HD Posters & Flyers (40 credits)",
    "pricing.feature.ghost": "Ghost output — Zero trace",
    "pricing.feature.cameo": "Full Cameo — 3 faces",

    "security.antiFraud": "IP Anti-Fraud",
    "security.encrypted": "Encrypted data",
    "security.ghost": "Ghost output — Zero trace",

    "face.title": "Full Cameo",
    "face.subtitle": "Up to 3 saved faces",
    "face.rule": "Golden Rule: 100% identity preserved — Zero morphing",
    "face.slot": "Face {n}",
    "face.uploadSuccess": "Photo imported successfully",
    "face.cameraError": "Unable to access camera",
    "face.scanSuccess": "Face scan successful!",
    "face.importTooltip": "Import a photo",
    "face.scanTooltip": "Scan my face",
    "face.importLabel": "Import a photo",
    "face.scanLabel": "Scan my face",
    "face.capture": "Capture",
    "face.scanning": "Forge analysis in progress...",

    "notFound.message": "Page not found",
    "notFound.back": "Back to home",
  },

  es: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "Créditos",
    "header.logout": "Cerrar sesión",

    "emailGate.subtitle": "Accede a la infraestructura de IA más avanzada",
    "emailGate.placeholder": "Tu correo profesional",
    "emailGate.error.required": "Introduce tu correo",
    "emailGate.error.invalid": "Correo inválido",
    "emailGate.button.enter": "ENTRAR EN LA FORJA KPOGO",
    "emailGate.button.validating": "Validación de la Forja...",
    "emailGate.privacy.line1": "Al continuar, aceptas nuestros términos de uso.",
    "emailGate.privacy.line2": "Tus datos están protegidos y cifrados.",

    "toast.welcome.title": "¡Bienvenido a la Golden Identity Forge!",
    "toast.welcome.desc": "Tu acceso ha sido activado.",
    "toast.lang.title": "Idioma: {lang}",
    "toast.lang.desc": "Interfaz actualizada",
    "toast.logout.title": "Sesión cerrada",
    "toast.logout.desc": "¡Hasta pronto en la Forja!",
    "toast.generation.title": "¡Generación finalizada!",
    "toast.generation.desc": "{cost} créditos usados. Archivo listo.",
    "toast.payment.title": "Validación de la Forja en curso...",
    "toast.payment.desc": "Acceso asegurado",

    "spec.title": "Especificaciones técnicas",
    "spec.video4k": "Vídeos 4K Ultra-HD de 30s",
    "spec.skin": "Texturas de piel 'Raw' realistas",
    "spec.network": "Optimizado para 2G/3G",
    "spec.continents": "Compatible en todo el mundo",

    "footer.line1": "© 2024 KPOGO — Infraestructura de identidad IA de élite",
    "footer.line2": "Desarrollado por el equipo KPOGO • Pagos seguros",

    "nav.video": "Vídeo 30s",
    "nav.photo": "Foto HD",
    "nav.voice": "Clonación de voz",
    "nav.clothing": "Ropa",
    "nav.posters": "Pósters",

    "tab.video.title": "Generador de vídeo 30s",
    "tab.video.desc": "Crea vídeos ultra realistas de 30 segundos con tus rostros",
    "tab.video.placeholder": "Describe tu escena... Ej: Un hombre con traje en una ciudad futurista al atardecer",
    "tab.video.fileLabel": "Vídeo o imagen de referencia",

    "tab.photo.title": "Generador de foto HD",
    "tab.photo.desc": "Fotos de alta resolución con texturas de piel realistas",
    "tab.photo.placeholder": "Describe tu foto... Ej: Retrato profesional con iluminación dramática",
    "tab.photo.fileLabel": "Imagen de referencia",

    "tab.voice.title": "Clonación de voz",
    "tab.voice.desc": "Clona tu voz exacta a partir de una muestra",
    "tab.voice.placeholder": "Texto para pronunciar con la voz clonada...",
    "tab.voice.fileLabel": "Muestra de voz (mín. 30s)",

    "tab.clothing.title": "Virtual Try-On",
    "tab.clothing.desc": "Cambia la ropa sin alterar el cuerpo",
    "tab.clothing.placeholder": "Describe el estilo... Ej: Traje negro de tres piezas con corbata dorada",
    "tab.clothing.fileLabel": "Foto para modificar",

    "tab.posters.title": "Estudio de pósters y flyers",
    "tab.posters.desc": "Crea visuales HD de marketing profesionales",
    "tab.posters.placeholder": "Describe tu póster... Ej: Póster neón con artista al centro",
    "tab.posters.fileLabel": "Imagen base (opcional)",

    "generator.credits": "créditos",
    "generator.result": "Resultado",
    "generator.download": "Descargar",
    "generator.resultAlt": "Resultado",
    "generator.outputGhost": "Salida Ghost — Sin logo, sin firma, sin metadatos",
    "generator.uploadHint": "Arrastra o haz clic para subir",
    "generator.generating": "Generando...",
    "generator.progress": "{progress}%",
    "generator.insufficientCredits": "Créditos insuficientes. Necesitas {cost} créditos.",
    "generator.newCreation": "Nueva creación",
    "generator.generate": "Generar",
    "generator.generateInProgress": "Generando...",

    "pricing.badge": "Pack único",
    "pricing.credits": "8.000 créditos",
    "pricing.approx": "≈ 60 vídeos o 400 fotos",
    "pricing.cta": "Comprar ahora",
    "pricing.paymentInfo": "Mobile Money • Tarjetas • Pago seguro",
    "pricing.feature.video": "Vídeos Ultra-HD de 30s (133 créditos)",
    "pricing.feature.photos": "Fotos HD realistas (20 créditos)",
    "pricing.feature.voice": "Clonación de voz precisa (100 créditos)",
    "pricing.feature.tryOn": "Virtual Try-On (30 créditos)",
    "pricing.feature.posters": "Pósters y flyers HD (40 créditos)",
    "pricing.feature.ghost": "Salida Ghost — Cero rastro",
    "pricing.feature.cameo": "Cameo completo — 3 rostros",

    "security.antiFraud": "Anti-fraude IP",
    "security.encrypted": "Datos cifrados",
    "security.ghost": "Salida Ghost — Cero rastro",

    "face.title": "Cameo completo",
    "face.subtitle": "Hasta 3 rostros guardados",
    "face.rule": "Regla de oro: Identidad 100% preservada — Cero morphing",
    "face.slot": "Rostro {n}",
    "face.uploadSuccess": "Foto importada con éxito",
    "face.cameraError": "No se puede acceder a la cámara",
    "face.scanSuccess": "¡Escaneo facial exitoso!",
    "face.importTooltip": "Importar una foto",
    "face.scanTooltip": "Escanear mi rostro",
    "face.importLabel": "Importar una foto",
    "face.scanLabel": "Escanear mi rostro",
    "face.capture": "Capturar",
    "face.scanning": "Análisis de la Forja en curso...",

    "notFound.message": "Página no encontrada",
    "notFound.back": "Volver al inicio",
  },

  de: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "Credits",
    "header.logout": "Abmelden",

    "emailGate.subtitle": "Zugang zur fortschrittlichsten KI-Infrastruktur",
    "emailGate.placeholder": "Ihre geschäftliche E-Mail",
    "emailGate.error.required": "Bitte E-Mail eingeben",
    "emailGate.error.invalid": "Ungültige E-Mail",
    "emailGate.button.enter": "IN DIE KPOGO-SCHMIEDE",
    "emailGate.button.validating": "Schmiede-Validierung...",
    "emailGate.privacy.line1": "Mit dem Fortfahren akzeptieren Sie unsere Nutzungsbedingungen.",
    "emailGate.privacy.line2": "Ihre Daten sind geschützt und verschlüsselt.",

    "toast.welcome.title": "Willkommen in der Golden Identity Forge!",
    "toast.welcome.desc": "Ihr Zugang wurde aktiviert.",
    "toast.lang.title": "Sprache: {lang}",
    "toast.lang.desc": "Oberfläche aktualisiert",
    "toast.logout.title": "Abgemeldet",
    "toast.logout.desc": "Bis bald in der Schmiede!",
    "toast.generation.title": "Generierung abgeschlossen!",
    "toast.generation.desc": "{cost} Credits verwendet. Datei bereit.",
    "toast.payment.title": "Schmiede-Validierung läuft...",
    "toast.payment.desc": "Zugang gesichert",

    "spec.title": "Technische Spezifikationen",
    "spec.video4k": "30s Ultra-HD 4K Videos",
    "spec.skin": "Realistische 'Raw'-Hauttexturen",
    "spec.network": "Für 2G/3G optimiert",
    "spec.continents": "Weltweit kompatibel",

    "footer.line1": "© 2024 KPOGO — Elite KI-Identitätsinfrastruktur",
    "footer.line2": "Entwickelt vom KPOGO-Team • Sichere Zahlungen",

    "nav.video": "30s Video",
    "nav.photo": "HD Foto",
    "nav.voice": "Stimmenklon",
    "nav.clothing": "Kleidung",
    "nav.posters": "Poster",

    "tab.video.title": "30s Video-Generator",
    "tab.video.desc": "Erstellen Sie ultra-realistische 30-Sekunden-Videos mit Ihren Gesichtern",
    "tab.video.placeholder": "Beschreiben Sie Ihre Szene... z.B.: Ein Mann im Anzug in einer futuristischen Stadt bei Sonnenuntergang",
    "tab.video.fileLabel": "Referenzvideo oder -bild",

    "tab.photo.title": "HD Foto-Generator",
    "tab.photo.desc": "Ultrahochauflösende Fotos mit realistischen Hauttexturen",
    "tab.photo.placeholder": "Beschreiben Sie Ihr Foto... z.B.: Studio-Porträt mit dramatischem Licht",
    "tab.photo.fileLabel": "Referenzbild",

    "tab.voice.title": "Stimmenklon",
    "tab.voice.desc": "Klonen Sie Ihre Stimme aus einem Audio-Sample",
    "tab.voice.placeholder": "Text, der mit der geklonten Stimme gesprochen wird...",
    "tab.voice.fileLabel": "Stimmenprobe (mind. 30s)",

    "tab.clothing.title": "Virtual Try-On",
    "tab.clothing.desc": "Kleidung ändern ohne den Körper zu verändern",
    "tab.clothing.placeholder": "Beschreiben Sie das Outfit... z.B.: Schwarzer Dreiteiler mit goldener Krawatte",
    "tab.clothing.fileLabel": "Foto zum Ändern",

    "tab.posters.title": "Poster & Flyer Studio",
    "tab.posters.desc": "Professionelle HD-Marketingvisuals erstellen",
    "tab.posters.placeholder": "Beschreiben Sie Ihr Poster... z.B.: Neon-Konzertposter mit Künstler im Zentrum",
    "tab.posters.fileLabel": "Basisbild (optional)",

    "generator.credits": "Credits",
    "generator.result": "Ergebnis",
    "generator.download": "Herunterladen",
    "generator.resultAlt": "Ergebnis",
    "generator.outputGhost": "Ghost-Output — Kein Logo, keine Signatur, keine Metadaten",
    "generator.uploadHint": "Ziehen oder klicken zum Hochladen",
    "generator.generating": "Generierung läuft...",
    "generator.progress": "{progress}%",
    "generator.insufficientCredits": "Nicht genug Credits. Sie benötigen {cost} Credits.",
    "generator.newCreation": "Neue Kreation",
    "generator.generate": "Generieren",
    "generator.generateInProgress": "Generierung...",

    "pricing.badge": "Einzelpaket",
    "pricing.credits": "8.000 Credits",
    "pricing.approx": "≈ 60 Videos oder 400 Fotos",
    "pricing.cta": "Jetzt kaufen",
    "pricing.paymentInfo": "Mobile Money • Karten • Sichere Zahlung",
    "pricing.feature.video": "30s Ultra-HD Videos (133 Credits)",
    "pricing.feature.photos": "Realistische HD-Fotos (20 Credits)",
    "pricing.feature.voice": "Präzises Stimmenklonen (100 Credits)",
    "pricing.feature.tryOn": "Virtual Try-On (30 Credits)",
    "pricing.feature.posters": "HD Poster & Flyer (40 Credits)",
    "pricing.feature.ghost": "Ghost-Output — Keine Spuren",
    "pricing.feature.cameo": "Full Cameo — 3 Gesichter",

    "security.antiFraud": "IP Anti-Fraud",
    "security.encrypted": "Verschlüsselte Daten",
    "security.ghost": "Ghost-Output — Keine Spuren",

    "face.title": "Full Cameo",
    "face.subtitle": "Bis zu 3 gespeicherte Gesichter",
    "face.rule": "Goldene Regel: Identität 100% bewahrt — Kein Morphing",
    "face.slot": "Gesicht {n}",
    "face.uploadSuccess": "Foto erfolgreich importiert",
    "face.cameraError": "Kamera nicht verfügbar",
    "face.scanSuccess": "Gesichtsscan erfolgreich!",
    "face.importTooltip": "Foto importieren",
    "face.scanTooltip": "Gesicht scannen",
    "face.importLabel": "Foto importieren",
    "face.scanLabel": "Gesicht scannen",
    "face.capture": "Aufnehmen",
    "face.scanning": "Analyse der Schmiede läuft...",

    "notFound.message": "Seite nicht gefunden",
    "notFound.back": "Zur Startseite",
  },

  pt: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "Créditos",
    "header.logout": "Sair",

    "emailGate.subtitle": "Acesse a infraestrutura de IA mais avançada",
    "emailGate.placeholder": "Seu email profissional",
    "emailGate.error.required": "Digite seu email",
    "emailGate.error.invalid": "Email inválido",
    "emailGate.button.enter": "ENTRAR NA FORJA KPOGO",
    "emailGate.button.validating": "Validação da Forja...",
    "emailGate.privacy.line1": "Ao continuar, você aceita nossos termos de uso.",
    "emailGate.privacy.line2": "Seus dados são protegidos e criptografados.",

    "toast.welcome.title": "Bem-vindo à Golden Identity Forge!",
    "toast.welcome.desc": "Seu acesso foi ativado.",
    "toast.lang.title": "Idioma: {lang}",
    "toast.lang.desc": "Interface atualizada",
    "toast.logout.title": "Sessão encerrada",
    "toast.logout.desc": "Até breve na Forja!",
    "toast.generation.title": "Geração concluída!",
    "toast.generation.desc": "{cost} créditos usados. Arquivo pronto.",
    "toast.payment.title": "Validação da Forja em andamento...",
    "toast.payment.desc": "Acesso protegido",

    "spec.title": "Especificações técnicas",
    "spec.video4k": "Vídeos 4K Ultra-HD de 30s",
    "spec.skin": "Texturas de pele 'Raw' realistas",
    "spec.network": "Otimizado para 2G/3G",
    "spec.continents": "Compatível no mundo todo",

    "footer.line1": "© 2024 KPOGO — Infraestrutura de identidade IA de elite",
    "footer.line2": "Desenvolvido pela equipe KPOGO • Pagamentos seguros",

    "nav.video": "Vídeo 30s",
    "nav.photo": "Foto HD",
    "nav.voice": "Clonagem de voz",
    "nav.clothing": "Roupas",
    "nav.posters": "Pôsteres",

    "tab.video.title": "Gerador de vídeo 30s",
    "tab.video.desc": "Crie vídeos ultra realistas de 30 segundos com seus rostos",
    "tab.video.placeholder": "Descreva sua cena... Ex: Um homem de terno em uma cidade futurista ao pôr do sol",
    "tab.video.fileLabel": "Vídeo ou imagem de referência",

    "tab.photo.title": "Gerador de foto HD",
    "tab.photo.desc": "Fotos em altíssima resolução com texturas de pele realistas",
    "tab.photo.placeholder": "Descreva sua foto... Ex: Retrato profissional com luz dramática",
    "tab.photo.fileLabel": "Imagem de referência",

    "tab.voice.title": "Clonagem de voz",
    "tab.voice.desc": "Clone sua voz exata a partir de uma amostra",
    "tab.voice.placeholder": "Texto para falar com a voz clonada...",
    "tab.voice.fileLabel": "Amostra de voz (mín. 30s)",

    "tab.clothing.title": "Virtual Try-On",
    "tab.clothing.desc": "Troque roupas sem alterar o corpo",
    "tab.clothing.placeholder": "Descreva o traje... Ex: Terno preto de três peças com gravata dourada",
    "tab.clothing.fileLabel": "Foto para modificar",

    "tab.posters.title": "Estúdio de pôsteres e flyers",
    "tab.posters.desc": "Crie visuais HD de marketing profissionais",
    "tab.posters.placeholder": "Descreva seu pôster... Ex: Pôster neon com artista ao centro",
    "tab.posters.fileLabel": "Imagem base (opcional)",

    "generator.credits": "créditos",
    "generator.result": "Resultado",
    "generator.download": "Baixar",
    "generator.resultAlt": "Resultado",
    "generator.outputGhost": "Saída Ghost — Sem logo, sem assinatura, sem metadados",
    "generator.uploadHint": "Arraste ou clique para enviar",
    "generator.generating": "Gerando...",
    "generator.progress": "{progress}%",
    "generator.insufficientCredits": "Créditos insuficientes. Você precisa de {cost} créditos.",
    "generator.newCreation": "Nova criação",
    "generator.generate": "Gerar",
    "generator.generateInProgress": "Gerando...",

    "pricing.badge": "Pack único",
    "pricing.credits": "8.000 créditos",
    "pricing.approx": "≈ 60 vídeos ou 400 fotos",
    "pricing.cta": "Comprar agora",
    "pricing.paymentInfo": "Mobile Money • Cartões • Pagamento seguro",
    "pricing.feature.video": "Vídeos Ultra-HD de 30s (133 créditos)",
    "pricing.feature.photos": "Fotos HD realistas (20 créditos)",
    "pricing.feature.voice": "Clonagem de voz precisa (100 créditos)",
    "pricing.feature.tryOn": "Virtual Try-On (30 créditos)",
    "pricing.feature.posters": "Pôsteres e flyers HD (40 créditos)",
    "pricing.feature.ghost": "Saída Ghost — Zero rastro",
    "pricing.feature.cameo": "Cameo completo — 3 rostos",

    "security.antiFraud": "Anti-fraude IP",
    "security.encrypted": "Dados criptografados",
    "security.ghost": "Saída Ghost — Zero rastro",

    "face.title": "Cameo completo",
    "face.subtitle": "Até 3 rostos salvos",
    "face.rule": "Regra de ouro: Identidade 100% preservada — Zero morphing",
    "face.slot": "Rosto {n}",
    "face.uploadSuccess": "Foto importada com sucesso",
    "face.cameraError": "Não foi possível acessar a câmera",
    "face.scanSuccess": "Scan facial concluído!",
    "face.importTooltip": "Importar uma foto",
    "face.scanTooltip": "Escanear meu rosto",
    "face.importLabel": "Importar uma foto",
    "face.scanLabel": "Escanear meu rosto",
    "face.capture": "Capturar",
    "face.scanning": "Análise da Forja em andamento...",

    "notFound.message": "Página não encontrada",
    "notFound.back": "Voltar para o início",
  },

  it: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "Crediti",
    "header.logout": "Disconnetti",

    "emailGate.subtitle": "Accedi all'infrastruttura IA più avanzata",
    "emailGate.placeholder": "La tua email professionale",
    "emailGate.error.required": "Inserisci la tua email",
    "emailGate.error.invalid": "Email non valida",
    "emailGate.button.enter": "ENTRA NELLA FORGIA KPOGO",
    "emailGate.button.validating": "Validazione della Forgia...",
    "emailGate.privacy.line1": "Continuando, accetti i nostri termini di utilizzo.",
    "emailGate.privacy.line2": "I tuoi dati sono protetti e cifrati.",

    "toast.welcome.title": "Benvenuto nella Golden Identity Forge!",
    "toast.welcome.desc": "Il tuo accesso è stato attivato.",
    "toast.lang.title": "Lingua: {lang}",
    "toast.lang.desc": "Interfaccia aggiornata",
    "toast.logout.title": "Disconnessione riuscita",
    "toast.logout.desc": "A presto nella Forgia!",
    "toast.generation.title": "Generazione completata!",
    "toast.generation.desc": "{cost} crediti usati. File pronto.",
    "toast.payment.title": "Validazione della Forgia in corso...",
    "toast.payment.desc": "Accesso protetto",

    "spec.title": "Specifiche tecniche",
    "spec.video4k": "Video 4K Ultra-HD da 30s",
    "spec.skin": "Texture pelle 'Raw' realistiche",
    "spec.network": "Ottimizzato per 2G/3G",
    "spec.continents": "Compatibile ovunque",

    "footer.line1": "© 2024 KPOGO — Infrastruttura IA d'élite",
    "footer.line2": "Sviluppato dal team KPOGO • Pagamenti sicuri",

    "nav.video": "Video 30s",
    "nav.photo": "Foto HD",
    "nav.voice": "Clonazione vocale",
    "nav.clothing": "Abiti",
    "nav.posters": "Poster",

    "tab.video.title": "Generatore video 30s",
    "tab.video.desc": "Crea video ultra realistici di 30 secondi con i tuoi volti",
    "tab.video.placeholder": "Descrivi la scena... Es: Un uomo in abito in una città futuristica al tramonto",
    "tab.video.fileLabel": "Video o immagine di riferimento",

    "tab.photo.title": "Generatore foto HD",
    "tab.photo.desc": "Foto ad altissima risoluzione con texture realistiche",
    "tab.photo.placeholder": "Descrivi la foto... Es: Ritratto in studio con luce drammatica",
    "tab.photo.fileLabel": "Immagine di riferimento",

    "tab.voice.title": "Clonazione vocale",
    "tab.voice.desc": "Clona la tua voce da un campione audio",
    "tab.voice.placeholder": "Testo da pronunciare con la voce clonata...",
    "tab.voice.fileLabel": "Campione vocale (min. 30s)",

    "tab.clothing.title": "Virtual Try-On",
    "tab.clothing.desc": "Cambia vestiti senza alterare il corpo",
    "tab.clothing.placeholder": "Descrivi l'outfit... Es: Completo nero con cravatta dorata",
    "tab.clothing.fileLabel": "Foto da modificare",

    "tab.posters.title": "Studio poster e flyer",
    "tab.posters.desc": "Crea visual marketing HD professionali",
    "tab.posters.placeholder": "Descrivi il poster... Es: Poster neon con artista al centro",
    "tab.posters.fileLabel": "Immagine base (opzionale)",

    "generator.credits": "crediti",
    "generator.result": "Risultato",
    "generator.download": "Scarica",
    "generator.resultAlt": "Risultato",
    "generator.outputGhost": "Output Ghost — Nessun logo, nessuna firma, nessun metadato",
    "generator.uploadHint": "Trascina o clicca per caricare",
    "generator.generating": "Generazione in corso...",
    "generator.progress": "{progress}%",
    "generator.insufficientCredits": "Crediti insufficienti. Servono {cost} crediti.",
    "generator.newCreation": "Nuova creazione",
    "generator.generate": "Genera",
    "generator.generateInProgress": "Generazione...",

    "pricing.badge": "Pack unico",
    "pricing.credits": "8.000 crediti",
    "pricing.approx": "≈ 60 video o 400 foto",
    "pricing.cta": "Acquista ora",
    "pricing.paymentInfo": "Mobile Money • Carte • Pagamento sicuro",
    "pricing.feature.video": "Video 4K da 30s (133 crediti)",
    "pricing.feature.photos": "Foto HD realistiche (20 crediti)",
    "pricing.feature.voice": "Clonazione vocale precisa (100 crediti)",
    "pricing.feature.tryOn": "Virtual Try-On (30 crediti)",
    "pricing.feature.posters": "Poster e flyer HD (40 crediti)",
    "pricing.feature.ghost": "Output Ghost — Zero traccia",
    "pricing.feature.cameo": "Cameo completo — 3 volti",

    "security.antiFraud": "Anti-frode IP",
    "security.encrypted": "Dati cifrati",
    "security.ghost": "Output Ghost — Zero traccia",

    "face.title": "Cameo completo",
    "face.subtitle": "Fino a 3 volti salvati",
    "face.rule": "Regola d'oro: Identità 100% preservata — Zero morphing",
    "face.slot": "Volto {n}",
    "face.uploadSuccess": "Foto importata con successo",
    "face.cameraError": "Impossibile accedere alla fotocamera",
    "face.scanSuccess": "Scansione riuscita!",
    "face.importTooltip": "Importa una foto",
    "face.scanTooltip": "Scansiona il mio volto",
    "face.importLabel": "Importa una foto",
    "face.scanLabel": "Scansiona il mio volto",
    "face.capture": "Cattura",
    "face.scanning": "Analisi della Forgia in corso...",

    "notFound.message": "Pagina non trovata",
    "notFound.back": "Torna alla home",
  },

  ar: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "أرصدة",
    "header.logout": "تسجيل الخروج",

    "emailGate.subtitle": "ادخل إلى بنية الذكاء الاصطناعي الأكثر تطوراً",
    "emailGate.placeholder": "بريدك المهني",
    "emailGate.error.required": "يرجى إدخال بريدك",
    "emailGate.error.invalid": "بريد غير صالح",
    "emailGate.button.enter": "الدخول إلى فورج KPOGO",
    "emailGate.button.validating": "جارٍ التحقق...",
    "emailGate.privacy.line1": "بالمتابعة، أنت توافق على شروط الاستخدام.",
    "emailGate.privacy.line2": "بياناتك محمية ومشفرة.",

    "toast.welcome.title": "مرحباً بك في Golden Identity Forge!",
    "toast.welcome.desc": "تم تفعيل الوصول.",
    "toast.lang.title": "اللغة: {lang}",
    "toast.lang.desc": "تم تحديث الواجهة",
    "toast.logout.title": "تم تسجيل الخروج",
    "toast.logout.desc": "نراك قريباً في الفورج!",
    "toast.generation.title": "اكتملت العملية!",
    "toast.generation.desc": "تم استخدام {cost} رصيداً. الملف جاهز.",
    "toast.payment.title": "جارٍ التحقق من الفورج...",
    "toast.payment.desc": "تم تأمين الوصول",

    "spec.title": "المواصفات التقنية",
    "spec.video4k": "فيديو 4K Ultra‑HD لمدة 30 ثانية",
    "spec.skin": "ملمس بشرة واقعي",
    "spec.network": "محسن لشبكات 2G/3G",
    "spec.continents": "متوافق عالمياً",

    "footer.line1": "© 2024 KPOGO — بنية هوية ذكاء اصطناعي فاخرة",
    "footer.line2": "من تطوير فريق KPOGO • مدفوعات آمنة",

    "nav.video": "فيديو 30ث",
    "nav.photo": "صورة HD",
    "nav.voice": "استنساخ الصوت",
    "nav.clothing": "ملابس",
    "nav.posters": "ملصقات",

    "tab.video.title": "مولد فيديو 30ث",
    "tab.video.desc": "أنشئ فيديوهات واقعية لمدة 30 ثانية بوجوهك",
    "tab.video.placeholder": "صف المشهد...",
    "tab.video.fileLabel": "مرجع فيديو أو صورة",

    "tab.photo.title": "مولد صور HD",
    "tab.photo.desc": "صور عالية الدقة بملمس بشرة واقعي",
    "tab.photo.placeholder": "صف الصورة...",
    "tab.photo.fileLabel": "صورة مرجعية",

    "tab.voice.title": "استنساخ الصوت",
    "tab.voice.desc": "استنسخ صوتك من عينة صوتية",
    "tab.voice.placeholder": "نص ليُنطق بالصوت المستنسخ...",
    "tab.voice.fileLabel": "عينة صوت (30ث على الأقل)",

    "tab.clothing.title": "Virtual Try-On",
    "tab.clothing.desc": "تغيير الملابس دون تغيير الجسم",
    "tab.clothing.placeholder": "صف الزي...",
    "tab.clothing.fileLabel": "صورة للتعديل",

    "tab.posters.title": "استوديو ملصقات",
    "tab.posters.desc": "أنشئ مواد تسويق HD احترافية",
    "tab.posters.placeholder": "صف الملصق...",
    "tab.posters.fileLabel": "صورة أساس (اختياري)",

    "generator.credits": "أرصدة",
    "generator.result": "النتيجة",
    "generator.download": "تنزيل",
    "generator.resultAlt": "النتيجة",
    "generator.outputGhost": "Ghost — بدون شعار أو بيانات وصفية",
    "generator.uploadHint": "اسحب أو انقر للرفع",
    "generator.generating": "جارٍ التوليد...",
    "generator.progress": "{progress}%",
    "generator.insufficientCredits": "الأرصدة غير كافية. تحتاج إلى {cost}.",
    "generator.newCreation": "إنشاء جديد",
    "generator.generate": "توليد",
    "generator.generateInProgress": "جارٍ التوليد...",

    "pricing.badge": "باقة واحدة",
    "pricing.credits": "8,000 رصيد",
    "pricing.approx": "≈ 60 فيديو أو 400 صورة",
    "pricing.cta": "اشتر الآن",
    "pricing.paymentInfo": "Mobile Money • بطاقات • دفع آمن",
    "pricing.feature.video": "فيديو 30ث (133 رصيداً)",
    "pricing.feature.photos": "صور HD (20 رصيداً)",
    "pricing.feature.voice": "استنساخ صوت (100 رصيد)",
    "pricing.feature.tryOn": "Virtual Try-On (30 رصيد)",
    "pricing.feature.posters": "ملصقات HD (40 رصيد)",
    "pricing.feature.ghost": "Ghost — بدون أثر",
    "pricing.feature.cameo": "Cameo — 3 وجوه",

    "security.antiFraud": "مكافحة احتيال IP",
    "security.encrypted": "بيانات مشفرة",
    "security.ghost": "Ghost — بدون أثر",

    "face.title": "Cameo",
    "face.subtitle": "حتى 3 وجوه محفوظة",
    "face.rule": "القاعدة الذهبية: الحفاظ على الهوية 100%",
    "face.slot": "وجه {n}",
    "face.uploadSuccess": "تم استيراد الصورة",
    "face.cameraError": "تعذر الوصول للكاميرا",
    "face.scanSuccess": "تم المسح بنجاح!",
    "face.importTooltip": "استيراد صورة",
    "face.scanTooltip": "مسح الوجه",
    "face.importLabel": "استيراد صورة",
    "face.scanLabel": "مسح الوجه",
    "face.capture": "التقاط",
    "face.scanning": "جارٍ التحليل...",

    "notFound.message": "الصفحة غير موجودة",
    "notFound.back": "العودة للرئيسية",
  },

  zh: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "积分",
    "header.logout": "退出",

    "emailGate.subtitle": "进入最先进的 AI 基础设施",
    "emailGate.placeholder": "您的工作邮箱",
    "emailGate.error.required": "请输入邮箱",
    "emailGate.error.invalid": "邮箱无效",
    "emailGate.button.enter": "进入 KPOGO 锻造炉",
    "emailGate.button.validating": "锻造验证中...",
    "emailGate.privacy.line1": "继续即表示你同意使用条款。",
    "emailGate.privacy.line2": "你的数据已加密保护。",

    "toast.welcome.title": "欢迎来到 Golden Identity Forge！",
    "toast.welcome.desc": "访问已激活。",
    "toast.lang.title": "语言：{lang}",
    "toast.lang.desc": "界面已更新",
    "toast.logout.title": "已退出",
    "toast.logout.desc": "期待在锻造炉再见！",
    "toast.generation.title": "生成完成！",
    "toast.generation.desc": "已使用 {cost} 积分，文件就绪。",
    "toast.payment.title": "锻造验证进行中...",
    "toast.payment.desc": "访问已加固",

    "spec.title": "技术规格",
    "spec.video4k": "30 秒 4K Ultra‑HD 视频",
    "spec.skin": "真实肤质纹理",
    "spec.network": "针对 2G/3G 优化",
    "spec.continents": "全球兼容",

    "footer.line1": "© 2024 KPOGO — 精英 AI 身份基础设施",
    "footer.line2": "由 KPOGO 团队打造 • 安全支付",

    "nav.video": "30 秒视频",
    "nav.photo": "高清照片",
    "nav.voice": "声音克隆",
    "nav.clothing": "服装",
    "nav.posters": "海报",

    "tab.video.title": "30 秒视频生成器",
    "tab.video.desc": "用你的面孔生成超真实 30 秒视频",
    "tab.video.placeholder": "描述你的场景...",
    "tab.video.fileLabel": "参考视频或图片",

    "tab.photo.title": "高清照片生成器",
    "tab.photo.desc": "超高分辨率照片与真实肤质",
    "tab.photo.placeholder": "描述你的照片...",
    "tab.photo.fileLabel": "参考图片",

    "tab.voice.title": "声音克隆",
    "tab.voice.desc": "从音频样本克隆你的声音",
    "tab.voice.placeholder": "要用克隆声音朗读的文本...",
    "tab.voice.fileLabel": "声音样本（至少 30 秒）",

    "tab.clothing.title": "Virtual Try-On",
    "tab.clothing.desc": "不改变身体的情况下更换服装",
    "tab.clothing.placeholder": "描述服装风格...",
    "tab.clothing.fileLabel": "需要修改的照片",

    "tab.posters.title": "海报与传单工作室",
    "tab.posters.desc": "生成专业 HD 营销视觉",
    "tab.posters.placeholder": "描述你的海报...",
    "tab.posters.fileLabel": "基础图片（可选）",

    "generator.credits": "积分",
    "generator.result": "结果",
    "generator.download": "下载",
    "generator.resultAlt": "结果",
    "generator.outputGhost": "Ghost 输出 — 无 logo、无签名、无元数据",
    "generator.uploadHint": "拖拽或点击上传",
    "generator.generating": "生成中...",
    "generator.progress": "{progress}%",
    "generator.insufficientCredits": "积分不足，需要 {cost}。",
    "generator.newCreation": "新创作",
    "generator.generate": "生成",
    "generator.generateInProgress": "生成中...",

    "pricing.badge": "单一套餐",
    "pricing.credits": "8,000 积分",
    "pricing.approx": "≈ 60 视频或 400 照片",
    "pricing.cta": "立即购买",
    "pricing.paymentInfo": "Mobile Money • 银行卡 • 安全支付",
    "pricing.feature.video": "30 秒 Ultra-HD 视频（133 积分）",
    "pricing.feature.photos": "真实 HD 照片（20 积分）",
    "pricing.feature.voice": "精准声音克隆（100 积分）",
    "pricing.feature.tryOn": "Virtual Try-On（30 积分）",
    "pricing.feature.posters": "海报与传单 HD（40 积分）",
    "pricing.feature.ghost": "Ghost 输出 — 零痕迹",
    "pricing.feature.cameo": "完整 Cameo — 3 张脸",

    "security.antiFraud": "IP 防欺诈",
    "security.encrypted": "加密数据",
    "security.ghost": "Ghost 输出 — 零痕迹",

    "face.title": "完整 Cameo",
    "face.subtitle": "最多保存 3 张脸",
    "face.rule": "黄金法则：100% 保持身份 — 零变形",
    "face.slot": "面孔 {n}",
    "face.uploadSuccess": "照片导入成功",
    "face.cameraError": "无法访问相机",
    "face.scanSuccess": "面部扫描成功！",
    "face.importTooltip": "导入照片",
    "face.scanTooltip": "扫描我的脸",
    "face.importLabel": "导入照片",
    "face.scanLabel": "扫描我的脸",
    "face.capture": "捕获",
    "face.scanning": "锻造分析进行中...",

    "notFound.message": "页面未找到",
    "notFound.back": "返回首页",
  },

  ja: {
    "brand.tagline": "GOLDEN IDENTITY FORGE",
    "header.credits": "クレジット",
    "header.logout": "ログアウト",

    "emailGate.subtitle": "最先端のAIインフラにアクセス",
    "emailGate.placeholder": "お仕事用メール",
    "emailGate.error.required": "メールを入力してください",
    "emailGate.error.invalid": "無効なメール",
    "emailGate.button.enter": "KPOGO FORGEに入る",
    "emailGate.button.validating": "Forge検証中...",
    "emailGate.privacy.line1": "続行することで利用規約に同意します。",
    "emailGate.privacy.line2": "データは暗号化され保護されています。",

    "toast.welcome.title": "Golden Identity Forgeへようこそ！",
    "toast.welcome.desc": "アクセスが有効になりました。",
    "toast.lang.title": "言語: {lang}",
    "toast.lang.desc": "インターフェースが更新されました",
    "toast.logout.title": "ログアウトしました",
    "toast.logout.desc": "またForgeでお会いしましょう！",
    "toast.generation.title": "生成完了！",
    "toast.generation.desc": "{cost}クレジット使用。ファイル準備完了。",
    "toast.payment.title": "Forge検証中...",
    "toast.payment.desc": "アクセス確保",

    "spec.title": "技術仕様",
    "spec.video4k": "30秒 4K Ultra-HD動画",
    "spec.skin": "リアルな肌テクスチャ",
    "spec.network": "2G/3G最適化",
    "spec.continents": "世界対応",

    "footer.line1": "© 2024 KPOGO — エリートAIアイデンティティ基盤",
    "footer.line2": "KPOGOチーム開発 • 安全な支払い",

    "nav.video": "30秒動画",
    "nav.photo": "HD写真",
    "nav.voice": "声クローン",
    "nav.clothing": "服装",
    "nav.posters": "ポスター",

    "tab.video.title": "30秒動画ジェネレーター",
    "tab.video.desc": "あなたの顔で超リアルな30秒動画を作成",
    "tab.video.placeholder": "シーンを説明...",
    "tab.video.fileLabel": "参照動画または画像",

    "tab.photo.title": "HD写真ジェネレーター",
    "tab.photo.desc": "リアルな肌テクスチャの超高解像度写真",
    "tab.photo.placeholder": "写真を説明...",
    "tab.photo.fileLabel": "参照画像",

    "tab.voice.title": "声クローン",
    "tab.voice.desc": "音声サンプルからあなたの声をクローン",
    "tab.voice.placeholder": "クローン声で話すテキスト...",
    "tab.voice.fileLabel": "音声サンプル（最低30秒）",

    "tab.clothing.title": "Virtual Try-On",
    "tab.clothing.desc": "体を変えずに服を変更",
    "tab.clothing.placeholder": "服装スタイルを説明...",
    "tab.clothing.fileLabel": "修正する写真",

    "tab.posters.title": "ポスター＆チラシスタジオ",
    "tab.posters.desc": "プロ仕様のHDマーケティングビジュアルを作成",
    "tab.posters.placeholder": "ポスターを説明...",
    "tab.posters.fileLabel": "ベース画像（任意）",

    "generator.credits": "クレジット",
    "generator.result": "結果",
    "generator.download": "ダウンロード",
    "generator.resultAlt": "結果",
    "generator.outputGhost": "Ghost出力 — ロゴなし、署名なし、メタデータなし",
    "generator.uploadHint": "ドラッグまたはクリックでアップロード",
    "generator.generating": "生成中...",
    "generator.progress": "{progress}%",
    "generator.insufficientCredits": "クレジット不足。{cost}クレジットが必要です。",
    "generator.newCreation": "新規作成",
    "generator.generate": "生成",
    "generator.generateInProgress": "生成中...",

    "pricing.badge": "シングルパック",
    "pricing.credits": "8,000クレジット",
    "pricing.approx": "≈ 60動画または400写真",
    "pricing.cta": "今すぐ購入",
    "pricing.paymentInfo": "Mobile Money • カード • 安全な支払い",
    "pricing.feature.video": "30秒 Ultra-HD動画（133クレジット）",
    "pricing.feature.photos": "リアルHD写真（20クレジット）",
    "pricing.feature.voice": "正確な声クローン（100クレジット）",
    "pricing.feature.tryOn": "Virtual Try-On（30クレジット）",
    "pricing.feature.posters": "HDポスター＆チラシ（40クレジット）",
    "pricing.feature.ghost": "Ghost出力 — 痕跡ゼロ",
    "pricing.feature.cameo": "フルCameo — 3顔",

    "security.antiFraud": "IP不正防止",
    "security.encrypted": "暗号化データ",
    "security.ghost": "Ghost出力 — 痕跡ゼロ",

    "face.title": "フルCameo",
    "face.subtitle": "最大3顔を保存",
    "face.rule": "ゴールデンルール: 100%アイデンティティ保持 — モーフィングゼロ",
    "face.slot": "顔 {n}",
    "face.uploadSuccess": "写真のインポート成功",
    "face.cameraError": "カメラにアクセスできません",
    "face.scanSuccess": "顔スキャン成功！",
    "face.importTooltip": "写真をインポート",
    "face.scanTooltip": "顔をスキャン",
    "face.importLabel": "写真をインポート",
    "face.scanLabel": "顔をスキャン",
    "face.capture": "キャプチャ",
    "face.scanning": "Forge分析中...",

    "notFound.message": "ページが見つかりません",
    "notFound.back": "ホームに戻る",
  },
};

export function t(key: TranslationKey, lang: SupportedLang, replacements?: Record<string, string | number>): string {
  let text = translations[lang]?.[key] ?? translations.en[key] ?? key;
  if (replacements) {
    Object.entries(replacements).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  return text;
}