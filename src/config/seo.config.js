export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ||
  "https://piyushras.vercel.app";

export const SITE_NAME = "Piyush Ras";

export const SITE_TAGLINE = "हिंदी कविता का पियूष रस";

export const DEFAULT_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const DEFAULT_DESCRIPTION =
  "पियूष रस पर पियूष गौड़ की हिंदी कविताएँ, शायरी, भक्ति रस और देशप्रेम की रचनाएँ पढ़ें। नई कविताएँ, पसंद, बुकमार्क और टिप्पणी के साथ।";

export const DEFAULT_KEYWORDS =
  "Piyush Ras, Piyush Gaur, Hindi poetry, Hindi kavita, shayari, हिंदी कविता, भक्ति कविता, देशभक्ति कविता, हिंदी शायरी";

export const AUTHOR_NAME = "Piyush Gaur";

export const LOCALE = "hi_IN";

export const THEME_COLOR = "#3d2517";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.jpeg`;
console.log(SITE_URL);

export const TWITTER_CARD = "summary_large_image";
