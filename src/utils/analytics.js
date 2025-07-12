// Analytics utilities for BundleCraft
import config from '../config/config';

class Analytics {
  constructor() {
    this.enabled = config.enableAnalytics && config.isProduction;
    this.events = [];
  }

  // Track page views
  trackPageView(page) {
    if (!this.enabled) return;
    
    this.track('page_view', {
      page,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
  }

  // Track user actions
  trackEvent(eventName, properties = {}) {
    if (!this.enabled) return;
    
    this.track(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.href
    });
  }

  // Track user sign up
  trackSignUp(method = 'email') {
    this.trackEvent('user_signup', { method });
  }

  // Track bundle creation
  trackBundleCreated(bundleData) {
    this.trackEvent('bundle_created', {
      productCount: bundleData.products?.length || 0,
      totalValue: bundleData.originalPrice,
      bundleValue: bundleData.bundlePrice
    });
  }

  // Track product import
  trackProductImport(productCount) {
    this.trackEvent('products_imported', { productCount });
  }

  // Track errors
  trackError(error, context = {}) {
    if (!config.enableErrorReporting) return;
    
    this.track('error', {
      error: error.message || error,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    });
  }

  // Internal tracking method
  track(eventName, properties) {
    const event = {
      event: eventName,
      properties: {
        ...properties,
        app_version: config.appVersion,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`
      }
    };

    // Store events locally for now (in production, send to analytics service)
    this.events.push(event);
    
    if (config.debugMode) {
      console.log('Analytics Event:', event);
    }

    // In production, you would send this to your analytics service
    // Example: this.sendToAnalyticsService(event);
  }

  // Get stored events (for debugging)
  getEvents() {
    return this.events;
  }

  // Clear stored events
  clearEvents() {
    this.events = [];
  }
}

// Create singleton instance
const analytics = new Analytics();

export default analytics;
