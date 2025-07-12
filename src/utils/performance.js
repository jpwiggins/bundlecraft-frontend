// Performance monitoring utilities for BundleCraft
import config from '../config/config';
import analytics from './analytics';

class PerformanceMonitor {
  constructor() {
    this.enabled = config.isProduction;
    this.metrics = {};
    this.init();
  }

  init() {
    if (!this.enabled || typeof window === 'undefined') return;

    // Monitor page load performance
    window.addEventListener('load', () => {
      this.measurePageLoad();
    });

    // Monitor Core Web Vitals
    this.measureWebVitals();
  }

  measurePageLoad() {
    if (!window.performance || !window.performance.timing) return;

    const timing = window.performance.timing;
    const metrics = {
      // Page load metrics
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      loadComplete: timing.loadEventEnd - timing.navigationStart,
      domReady: timing.domComplete - timing.navigationStart,
      
      // Network metrics
      dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
      tcpConnect: timing.connectEnd - timing.connectStart,
      serverResponse: timing.responseEnd - timing.requestStart,
      
      // Rendering metrics
      domProcessing: timing.domComplete - timing.domLoading,
      
      // Total time
      totalTime: timing.loadEventEnd - timing.navigationStart
    };

    this.metrics.pageLoad = metrics;
    
    // Track slow page loads
    if (metrics.loadComplete > 3000) {
      analytics.trackEvent('slow_page_load', {
        loadTime: metrics.loadComplete,
        url: window.location.href
      });
    }

    if (config.debugMode) {
      console.log('Page Load Metrics:', metrics);
    }
  }

  measureWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
  }

  observeLCP() {
    if (!window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.lcp = lastEntry.startTime;
        
        // Track poor LCP (> 2.5s)
        if (lastEntry.startTime > 2500) {
          analytics.trackEvent('poor_lcp', {
            lcp: lastEntry.startTime,
            url: window.location.href
          });
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP observation failed:', error);
    }
  }

  observeFID() {
    if (!window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          
          // Track poor FID (> 100ms)
          if (entry.processingStart - entry.startTime > 100) {
            analytics.trackEvent('poor_fid', {
              fid: entry.processingStart - entry.startTime,
              url: window.location.href
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID observation failed:', error);
    }
  }

  observeCLS() {
    if (!window.PerformanceObserver) return;

    try {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        this.metrics.cls = clsValue;
        
        // Track poor CLS (> 0.1)
        if (clsValue > 0.1) {
          analytics.trackEvent('poor_cls', {
            cls: clsValue,
            url: window.location.href
          });
        }
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS observation failed:', error);
    }
  }

  // Measure custom performance marks
  mark(name) {
    if (!window.performance || !window.performance.mark) return;
    
    try {
      window.performance.mark(name);
    } catch (error) {
      console.warn('Performance mark failed:', error);
    }
  }

  // Measure time between two marks
  measure(name, startMark, endMark) {
    if (!window.performance || !window.performance.measure) return;
    
    try {
      window.performance.measure(name, startMark, endMark);
      
      const measure = window.performance.getEntriesByName(name)[0];
      if (measure) {
        this.metrics[name] = measure.duration;
        
        if (config.debugMode) {
          console.log(`Performance measure ${name}:`, measure.duration + 'ms');
        }
      }
    } catch (error) {
      console.warn('Performance measure failed:', error);
    }
  }

  // Get all collected metrics
  getMetrics() {
    return this.metrics;
  }

  // Report metrics to analytics
  reportMetrics() {
    if (Object.keys(this.metrics).length > 0) {
      analytics.trackEvent('performance_metrics', this.metrics);
    }
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
