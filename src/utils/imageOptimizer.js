// src/utils/imageOptimizer.js

/**
 * Generates appropriate srcset for responsive images
 * @param {string} basePath - Base path to the image without extension
 * @param {string} ext - Image extension (jpg, png, etc)
 * @param {number[]} widths - Array of widths to generate srcset for
 * @returns {string} - The srcset attribute string
 */
export function generateSrcSet(basePath, ext, widths = [640, 960, 1280, 1920]) {
  return widths.map((w) => `${basePath}-${w}.${ext} ${w}w`).join(", ");
}

/**
 * Returns the optimal image type based on browser support
 * Falls back to the original format if modern formats not supported
 * @param {string} originalSrc - Original image source
 * @returns {string} - Optimized image source
 */
export function getOptimalImageFormat(originalSrc) {
  if (typeof window === "undefined" || typeof document === "undefined")
    return originalSrc;

  // WebP support check
  const hasWebP =
    document
      .createElement("canvas")
      .toDataURL("image/webp")
      .indexOf("data:image/webp") === 0;

  if (
    hasWebP &&
    (originalSrc.endsWith(".jpg") ||
      originalSrc.endsWith(".jpeg") ||
      originalSrc.endsWith(".png"))
  ) {
    return originalSrc.substring(0, originalSrc.lastIndexOf(".")) + ".webp";
  }

  return originalSrc;
}

/**
 * Preloads important images to improve LCP
 * @param {string[]} imagePaths - Paths to critical images
 */
export function preloadCriticalImages(imagePaths) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  imagePaths.forEach((path) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = getOptimalImageFormat(path);
    document.head.appendChild(link);
  });
}

/**
 * Gets image dimensions from filename using naming convention
 * Example: image-800x600.jpg would return {width: 800, height: 600}
 * @param {string} src - Image source with dimensions in filename
 * @returns {Object|null} - Object with width and height or null if not found
 */
export function getDimensionsFromFilename(src) {
  if (!src) return null;

  const match = src.match(/(\d+)x(\d+)/);
  if (match && match.length === 3) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }

  return null;
}

/**
 * Creates a blur hash placeholder for images
 * Simple implementation for base64 data URL placeholder
 * @param {string} color - CSS color for placeholder
 * @param {number} width - Width of the placeholder
 * @param {number} height - Height of the placeholder
 * @returns {string} - Base64 data URL for placeholder
 */
export function createPlaceholder(color = "#f1f5f9", width = 10, height = 10) {
  if (typeof document === "undefined") return "";

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL("image/png");
}
