import React from 'react';
import { Helmet } from 'react-helmet';
import config from '../config/config';

function SEO({ 
  title = 'BundleCraft - Turn Printify Products Into Profitable Bundles',
  description = 'Import products, create smart bundles of 2-8 items, generate copy-paste ready Etsy listings with optimized pricing and tags!',
  keywords = 'printify, etsy, bundles, ecommerce, saas, product bundling, etsy listings, printify integration',
  image = '/og-image.png',
  url = config.websiteUrl,
  type = 'website'
}) {
  const fullTitle = title.includes('BundleCraft') ? title : `${title} | BundleCraft`;
  const fullUrl = url.startsWith('http') ? url : `${config.websiteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${config.websiteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="BundleCraft" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3b82f6" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="BundleCraft" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional SEO */}
      <meta name="application-name" content="BundleCraft" />
      <meta name="apple-mobile-web-app-title" content="BundleCraft" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "BundleCraft",
          "description": description,
          "url": config.websiteUrl,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "29",
            "priceCurrency": "USD",
            "priceValidUntil": "2025-12-31"
          },
          "creator": {
            "@type": "Organization",
            "name": "BundleCraft"
          }
        })}
      </script>
    </Helmet>
  );
}

export default SEO;