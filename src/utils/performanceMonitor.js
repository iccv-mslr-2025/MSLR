// src/utils/performanceMonitor.js

/**
 * Performance monitoring utility
 * Tracks and reports key web vitals and performance metrics
 */

// Constants
const PERFORMANCE_THRESHOLD = {
  FCP: 1800, // First Contentful Paint (good < 1.8s)
  LCP: 2500, // Largest Contentful Paint (good < 2.5s)
  FID: 100, // First Input Delay (good < 100ms)
  CLS: 0.1, // Cumulative Layout Shift (good < 0.1)
  TTI: 3800, // Time to Interactive (good < 3.8s)
};

/**
 * Logs performance metrics to console and/or analytics
 * @param {string} metricName - Name of the performance metric
 * @param {number} value - Value of the metric
 * @param {string} unit - Unit of measurement (ms, points, etc)
 * @param {boolean} sendToAnalytics - Whether to send to analytics
 */
export function logPerformanceMetric(
  metricName,
  value,
  unit = "ms",
  sendToAnalytics = true
) {
  // Format for readable output
  const formattedValue =
    unit === "ms" ? `${value.toFixed(2)}ms` : value.toFixed(3);

  // Determine if metric is good based on thresholds
  const threshold = PERFORMANCE_THRESHOLD[metricName];
  let status = "✅ Good";

  if (threshold) {
    if (value > threshold * 1.5) {
      status = "❌ Poor";
    } else if (value > threshold) {
      status = "⚠️ Needs Improvement";
    }
  }

  // Log to console
  console.info(`Performance: ${metricName} - ${formattedValue} ${status}`);

  // Send to analytics if enabled and available
  if (sendToAnalytics && window.gtag) {
    window.gtag("event", "performance_metric", {
      event_category: "Performance",
      event_label: metricName,
      value: Math.round(value * 100) / 100,
      metric_status: status.split(" ")[1],
      non_interaction: true,
    });
  }

  return { metricName, value, status };
}

/**
 * Measures time to first byte (TTFB)
 * @returns {number} TTFB in milliseconds
 */
export function measureTTFB() {
  if (!window.performance || !window.performance.timing) return null;

  const { responseStart, requestStart } = window.performance.timing;
  const ttfb = responseStart - requestStart;

  logPerformanceMetric("TTFB", ttfb);
  return ttfb;
}

/**
 * Initializes performance monitoring
 * Sets up listeners for various performance metrics
 */
export function initPerformanceMonitoring() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  // Use Performance Observer API if available
  if ("PerformanceObserver" in window) {
    try {
      // First Contentful Paint
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            logPerformanceMetric("FCP", entry.startTime);
          }
        }
      }).observe({ type: "paint", buffered: true });

      // Layout Shifts
      let cumulativeLayoutShift = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            cumulativeLayoutShift += entry.value;
            logPerformanceMetric("CLS", cumulativeLayoutShift, "points");
          }
        }
      }).observe({ type: "layout-shift", buffered: true });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          logPerformanceMetric("FID", entry.processingStart - entry.startTime);
        }
      }).observe({ type: "first-input", buffered: true });

      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        logPerformanceMetric("LCP", lastEntry.startTime);
      }).observe({ type: "largest-contentful-paint", buffered: true });

      // Resource timing for important resources
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          // Filter for key resources like hero images, CSS, fonts, etc.
          if (
            entry.name.includes("hero") ||
            entry.name.includes(".css") ||
            entry.name.includes("fonts/") ||
            entry.name.includes("critical")
          ) {
            const loadTime = entry.responseEnd - entry.startTime;
            logPerformanceMetric(
              `Resource-${entry.name.split("/").pop()}`,
              loadTime
            );
          }
        });
      }).observe({ type: "resource", buffered: true });
    } catch (e) {
      console.error("Error setting up performance observers:", e);
    }
  }

  // Legacy performance measuring for older browsers
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (window.performance && window.performance.timing) {
        const { navigationStart, domContentLoadedEventEnd, loadEventEnd } =
          window.performance.timing;

        // DOM Content Loaded
        if (domContentLoadedEventEnd) {
          const dcl = domContentLoadedEventEnd - navigationStart;
          logPerformanceMetric("DOMContentLoaded", dcl);
        }

        // Load Time
        if (loadEventEnd) {
          const loadTime = loadEventEnd - navigationStart;
          logPerformanceMetric("LoadComplete", loadTime);
        }
      }
    }, 0);
  });
}

/**
 * Analyze critical rendering path
 * Helps identify render-blocking resources
 */
export function analyzeCriticalPath() {
  if (!window.performance || !window.performance.getEntriesByType) return;

  const resources = window.performance.getEntriesByType("resource");

  // Group resources by type
  const resourcesByType = {
    css: [],
    js: [],
    fonts: [],
    images: [],
    other: [],
  };

  // Sort resources by load time
  resources.forEach((resource) => {
    const url = resource.name;
    const loadTime = resource.responseEnd - resource.startTime;
    const size = resource.transferSize;

    const resourceInfo = {
      url: url.split("/").pop(), // Just the filename
      loadTime,
      size,
      fullUrl: url,
    };

    if (url.endsWith(".css")) {
      resourcesByType.css.push(resourceInfo);
    } else if (url.endsWith(".js")) {
      resourcesByType.js.push(resourceInfo);
    } else if (
      url.includes("fonts/") ||
      url.endsWith(".woff") ||
      url.endsWith(".woff2") ||
      url.endsWith(".ttf")
    ) {
      resourcesByType.fonts.push(resourceInfo);
    } else if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      resourcesByType.images.push(resourceInfo);
    } else {
      resourcesByType.other.push(resourceInfo);
    }
  });

  // Sort each category by load time (descending)
  Object.keys(resourcesByType).forEach((type) => {
    resourcesByType[type].sort((a, b) => b.loadTime - a.loadTime);
  });

  // Log the slowest resources in each category
  Object.keys(resourcesByType).forEach((type) => {
    const resources = resourcesByType[type];
    if (resources.length > 0) {
      console.group(`Slowest ${type} resources:`);
      resources.slice(0, 3).forEach((resource, i) => {
        console.log(
          `${i + 1}. ${resource.url}: ${resource.loadTime.toFixed(2)}ms (${(
            resource.size / 1024
          ).toFixed(2)}KB)`
        );
      });
      console.groupEnd();
    }
  });

  return resourcesByType;
}

/**
 * Detect Long Tasks that could cause jank
 */
export function detectLongTasks() {
  if (!window.PerformanceObserver) return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        logPerformanceMetric("LongTask", entry.duration, "ms", false);
        console.warn(
          `Long task detected: ${entry.duration.toFixed(2)}ms`,
          entry
        );
      }
    });

    observer.observe({ entryTypes: ["longtask"] });
  } catch (e) {
    console.warn("Long tasks detection not supported");
  }
}

// Export all functions
export default {
  initPerformanceMonitoring,
  measureTTFB,
  logPerformanceMetric,
  analyzeCriticalPath,
  detectLongTasks,
};
