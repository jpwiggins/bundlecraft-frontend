// BundleCraft Constants

export const APP_CONFIG = {
  name: 'BundleCraft',
  version: '1.0.0',
  description: 'Turn Printify Products Into Profitable Bundles',
  url: 'https://jpwiggins.github.io/bundlecraft-frontend',
  author: 'BundleCraft Team'
};

export const PRICING = {
  monthly: {
    price: 29.99,
    period: 'month',
    features: [
      'Import unlimited Printify products',
      'Create unlimited bundles (2-8 items)',
      '15% automatic bundle discount',
      'Generate optimized Etsy listings',
      'Smart pricing & SEO tags',
      'Copy/paste ready descriptions',
      '95% customer assistance'
    ]
  },
  yearly: {
    price: 269,
    period: 'year',
    monthlyEquivalent: 22.42,
    savings: 90,
    features: [
      'Everything in Monthly plan',
      'Save $90 per year (25% OFF)',
      'Priority support & assistance',
      'Advanced bundle analytics',
      'Early access to new features',
      'Bulk bundle operations',
      'Custom bundle templates'
    ]
  }
};

export const BUNDLE_CONFIG = {
  minProducts: 2,
  maxProducts: 8,
  defaultDiscount: 15,
  minValue: 50,
  maxDiscount: 25
};

export const FEATURES = [
  {
    icon: '💰',
    title: '15% Bundle Discount',
    description: 'Automatic discount applied to all bundles, increasing your profit margins while providing customer value.'
  },
  {
    icon: '📦',
    title: '2-8 Product Bundles',
    description: 'Create perfectly sized bundles with 2-8 products that customers love and are easy to fulfill.'
  },
  {
    icon: '💎',
    title: '$50+ Bundle Value',
    description: 'Ensure every bundle meets the minimum value threshold for maximum profitability and customer satisfaction.'
  },
  {
    icon: '🎯',
    title: '95% Customer Assistance',
    description: 'Get expert support and guidance to maximize your bundle success with our dedicated assistance team.'
  }
];

export const ETSY_CATEGORIES = [
  'Craft Supplies & Tools',
  'Handmade',
  'Art & Collectibles',
  'Clothing & Shoes',
  'Home & Living',
  'Jewelry & Accessories',
  'Paper & Party Supplies',
  'Pet Supplies',
  'Toys & Entertainment',
  'Vintage'
];

export const SEO_TAGS = [
  'bundle deal',
  'premium quality',
  'value pack',
  'gift set',
  'custom products',
  'bulk discount',
  'exclusive offer',
  'printify',
  'handmade',
  'personalized',
  'unique gift',
  'quality items',
  'limited time',
  'best value',
  'curated collection'
];

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  BUNDLE_CREATED: 'bundle_created',
  ETSY_LISTING_COPIED: 'etsy_listing_copied',
  PRODUCT_SELECTED: 'product_selected',
  API_KEY_SAVED: 'api_key_saved',
  PRICING_CTA_CLICKED: 'pricing_cta_clicked',
  DEMO_BUNDLE_CREATED: 'demo_bundle_created',
  USER_SIGNED_UP: 'user_signed_up',
  USER_LOGGED_IN: 'user_logged_in'
};

export const API_ENDPOINTS = {
  PRINTIFY_BASE: 'https://api.printify.com/v1',
  PRODUCTS: '/shops/{shop_id}/products.json',
  PRODUCT_DETAILS: '/shops/{shop_id}/products/{product_id}.json'
};

export const LOCAL_STORAGE_KEYS = {
  USER_DATA: 'bundlecraft_user',
  API_KEY: 'bundlecraft_api_key',
  BUNDLES: 'bundlecraft_bundles',
  PREFERENCES: 'bundlecraft_preferences'
};

export const ERROR_MESSAGES = {
  INVALID_API_KEY: 'Invalid Printify API key. Please check and try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  BUNDLE_MIN_PRODUCTS: 'Please select at least 2 products to create a bundle.',
  BUNDLE_MAX_PRODUCTS: 'Maximum 8 products allowed per bundle.',
  BUNDLE_MIN_VALUE: 'Bundle value must be at least $50.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
};

export const SUCCESS_MESSAGES = {
  BUNDLE_CREATED: 'Bundle created successfully!',
  ETSY_LISTING_COPIED: 'Etsy listing copied to clipboard!',
  API_KEY_SAVED: 'Printify API key saved successfully!',
  USER_REGISTERED: 'Account created successfully!',
  USER_LOGGED_IN: 'Welcome back!'
};

export default {
  APP_CONFIG,
  PRICING,
  BUNDLE_CONFIG,
  FEATURES,
  ETSY_CATEGORIES,
  SEO_TAGS,
  ANALYTICS_EVENTS,
  API_ENDPOINTS,
  LOCAL_STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
};