// src/components/common/SEOWrapper.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateStructuredData, generateOpenGraphTags, getCanonicalUrl, generateRobotsMeta } from '../../utils/seo';

/**
 * SEO Wrapper Component
 * Centralizes SEO metadata management
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.path - Current page path
 * @param {string} props.imageUrl - OG image URL
 * @param {boolean} props.noindex - Whether to noindex the page
 * @param {boolean} props.disableStructuredData - Whether to disable structured data
 * @param {Object} props.structuredData - Custom structured data
 * @param {Object} props.children - Child components
 */
const SEOWrapper = ({
  title = "MSLR 2025 | Multimodal Sign Language Recognition Workshop",
  description = "MSLR 2025 - Multimodal Sign Language Recognition Workshop at IEEE/CVF ICCV 2025 in Honolulu, Hawaii.",
  path = "",
  imageUrl = "/src/assets/images/logo_small.jpeg",
  noindex = false,
  disableStructuredData = false,
  structuredData = null,
  children
}) => {
  // Generate canonical URL
  const canonicalUrl = getCanonicalUrl("https://mslr2025.com", path);
  
  // Generate robots meta tags
  const robotsMeta = generateRobotsMeta({
    index: !noindex,
    follow: true
  });
  
  // Get Open Graph tags
  const ogTags = generateOpenGraphTags({
    title,
    description,
    imageUrl,
    url: canonicalUrl
  });
  
  // Get JSON-LD structured data
  const jsonLd = !disableStructuredData 
    ? (structuredData || generateStructuredData())
    : null;
  
  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Keywords for SEO */}
        <meta name="keywords" content="MSLR, sign language recognition, ICCV 2025, IEEE, computer vision, workshop, multimodal, Hawaii, sign language" />
        
        {/* Robot Meta Tags */}
        {robotsMeta.map((meta, index) => (
          <meta key={`robot-${index}`} name={meta.name} content={meta.content} />
        ))}
        
        {/* Open Graph / Social Media Tags */}
        {ogTags.map((meta, index) => {
          if (meta.property) {
            return <meta key={`og-${index}`} property={meta.property} content={meta.content} />;
          } else {
            return <meta key={`og-${index}`} name={meta.name} content={meta.content} />;
          }
        })}
        
        {/* JSON-LD Structured Data */}
        {jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        )}
        
        {/* Language and Other Meta Tags */}
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Mobile Meta Tags */}
        <meta name="theme-color" content="#0369a1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MSLR 2025" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>
      
      {children}
    </>
  );
};

export default SEOWrapper;