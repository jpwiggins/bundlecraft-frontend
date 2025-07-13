const config = {
  // API endpoints
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://api.bundlecraft.app/v1',
  printifyApiUrl: 'https://api.printify.com/v1',
  
  // Stripe keys
  stripePublishableKey: process.env.REACT_APP_STRIPE_PK || 'pk_test_51P...',
  
  // Plans
  plans: {
    monthly: {
      id: 'price_monthly',
      price: 29.99,
      name: 'Monthly Plan'
    },
    annual: {
      id: 'price_annual',
      price: 269.00,
      name: 'Annual Plan'
    }
  },
  
  // Feature flags
  features: {
    demoMode: process.env.REACT_APP_DEMO_MODE === 'true'
  }
};

export default config;
