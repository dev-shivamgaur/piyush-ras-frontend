import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  LOCALE,
  THEME_COLOR,
  TWITTER_CARD,
  AUTHOR_NAME,
} from "../config/seo.config";

/**
 * @param {object} props
 * @param {string} [props.title] - Page title (without site name suffix)
 * @param {string} [props.description]
 * @param {string} [props.path] - Path + query for canonical, e.g. `/read?k=abc`
 * @param {string} [props.image] - OG/Twitter image URL
 * @param {"website"|"article"} [props.type]
 * @param {boolean} [props.noindex] - Hide from search engines
 * @param {string} [props.keywords]
 * @param {object|object[]} [props.jsonLd] - Schema.org JSON-LD
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  keywords = DEFAULT_KEYWORDS,
  jsonLd,
}) {
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const robots = noindex ? "noindex, nofollow" : "index, follow";

  const schemaScripts = []
    .concat(jsonLd ?? [])
    .filter(Boolean)
    .map((data, i) => (
      <script key={i} type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    ));

  return (
    <Helmet>
      <html lang="hi" />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={AUTHOR_NAME} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content={THEME_COLOR} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={LOCALE} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title || SITE_NAME} />

      <meta name="twitter:card" content={TWITTER_CARD} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemaScripts}
    </Helmet>
  );
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "hi",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
  };
}

export function buildArticleSchema({ title, description, image, url, datePublished, author }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image ? [image] : undefined,
    url,
    datePublished,
    author: {
      "@type": "Person",
      name: author || AUTHOR_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_OG_IMAGE,
      },
    },
    inLanguage: "hi",
  };
}
