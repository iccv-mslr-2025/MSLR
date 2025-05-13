// src/utils/seo.js

/**
 * Generates structured data for the website (JSON-LD)
 * @returns {Object} JSON-LD structured data object
 */
export function generateStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "MSLR 2025 - Multimodal Sign Language Recognition Workshop",
    description:
      "IEEE/CVF ICCV 2025 Workshop on Multimodal Sign Language Recognition",
    startDate: "2025-10-20T08:30:00-10:00",
    endDate: "2025-10-20T18:15:00-10:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "ICCV 2025 Conference Venue",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Honolulu",
        addressRegion: "Hawaii",
        addressCountry: "USA",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "MSLR 2025 Organizing Committee",
      url: "https://mslr2025.com",
    },
    offers: {
      "@type": "Offer",
      url: "https://mslr2025.com/#registration",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2025-05-12",
    },
    performer: [
      {
        "@type": "Person",
        name: "Prof. Richard Bowden",
        affiliation: "University of Surrey, UK",
      },
      {
        "@type": "Person",
        name: "Dr. Oscar Koller",
        affiliation: "Microsoft Inc., USA",
      },
      {
        "@type": "Person",
        name: "Dr. Ehsan Hoque",
        affiliation: "University of Rochester, USA",
      },
    ],
    about: {
      "@type": "Thing",
      name: "Sign Language Recognition",
      description:
        "Research and technologies for recognizing and translating sign languages",
    },
  };

  return structuredData;
}

/**
 * Generates Open Graph meta tags for the page
 * @param {Object} params - Parameters for OG tags
 * @returns {Array} Array of OG meta objects
 */
export function generateOpenGraphTags({
  title = "MSLR 2025 | Multimodal Sign Language Recognition",
  description = "ICCV 2025 Workshop on Multimodal Sign Language Recognition in Honolulu, Hawaii",
  imageUrl = "/src/assets/images/logo_small.jpeg",
  url = "https://mslr2025.com",
  type = "website",
} = {}) {
  return [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: "MSLR 2025 Workshop" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];
}

/**
 * Creates canonical URL for current page
 * @param {string} basePath - Base website URL
 * @param {string} path - Current page path
 * @returns {string} - Canonical URL
 */
export function getCanonicalUrl(basePath = "https://mslr2025.com", path = "") {
  // Remove trailing slash from base and leading slash from path
  const baseWithoutTrailingSlash = basePath.replace(/\/$/, "");
  const pathWithoutLeadingSlash = path.replace(/^\//, "");

  // Join with a single slash
  return `${baseWithoutTrailingSlash}/${pathWithoutLeadingSlash}`.replace(
    /\/$/,
    ""
  );
}

/**
 * Generates meta tags for robots/crawlers
 * @param {Object} params - Parameters
 * @returns {Array} - Array of meta objects
 */
export function generateRobotsMeta({
  index = true,
  follow = true,
  archive = true,
  snippet = true,
} = {}) {
  const directives = [];

  if (!index) directives.push("noindex");
  if (!follow) directives.push("nofollow");
  if (!archive) directives.push("noarchive");
  if (!snippet) directives.push("nosnippet");

  // Default to index, follow if no restrictions
  const content =
    directives.length > 0 ? directives.join(", ") : "index, follow";

  return [
    { name: "robots", content },
    { name: "googlebot", content },
  ];
}
