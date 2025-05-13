// src/hooks/useIntersectionObserver.js
import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for intersection observer with enhanced performance
 *
 * @param {Object} options - Intersection observer options
 * @param {Number} options.threshold - Visibility threshold (0-1)
 * @param {String} options.rootMargin - Root margin string (e.g. "0px 0px -200px 0px")
 * @param {Boolean} options.triggerOnce - Whether to unobserve after first trigger
 * @param {Element} options.root - Root element (default: viewport)
 * @returns {Array} [ref, inView, entry] - Ref to observe, inView state, and the full IntersectionObserverEntry
 */
const useIntersectionObserver = ({
  threshold = 0,
  rootMargin = "0px",
  triggerOnce = false,
  root = null,
  skip = false,
} = {}) => {
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState(null);
  const observed = useRef();
  const observer = useRef(null);

  useEffect(() => {
    // Skip setup if requested
    if (skip) return;

    // Clean up previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create a new observer with the given options
    observer.current = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        // Update state based on visibility
        setInView(isIntersecting);
        setEntry(entry);

        // If triggerOnce is true and element is visible, unobserve it
        if (isIntersecting && triggerOnce && observed.current) {
          observer.current.unobserve(observed.current);
        }
      },
      { threshold, rootMargin, root }
    );

    // Start observing the element if it exists
    const currentElement = observed.current;
    if (currentElement) {
      observer.current.observe(currentElement);
    }

    // Clean up on unmount
    return () => {
      if (observer.current && currentElement) {
        observer.current.unobserve(currentElement);
        observer.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce, root, skip]);

  return [observed, inView, entry];
};

export default useIntersectionObserver;
