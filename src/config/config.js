// Configuration file for BundleCraft Frontend

const config = {
  // API Configuration
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://bundlecraft-backend-production.up.railway.app',
  printifyApiUrl: process.env.REACT_APP_PRINTIFY_API_URL || 'https://api.printify.com/v1',
  
  // App Configuration
  appName: process.env.REACT_APP_APP_NAME || 'BundleCraft',
  appVersion: process.env.REACT_APP_APP_VERSION || '1.0.0',
  
  // Feature Flags
  enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  enableErrorReporting: process.env.REACT_APP_ENABLE_ERROR_REPORTING === 'true',
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  debugMode: process.env.REACT_APP_DEBUG_MODE === 'true',
  
  // URLs
  websiteUrl: process.env.REACT_APP_WEBSITE_URL || 'https://bundlecraft.netlify.app',
  
  // Pricing
  pricing: {
    monthly: 29,
    yearly: 279,
    yearlyDiscount: 0.2
  }
};

export default config;