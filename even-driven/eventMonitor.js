// monitoring.js
class EventMonitoring {
    constructor(eventBus) {
      this.eventBus = eventBus;
      this.metrics = new Map();
    }
  
    trackEvent(eventName, duration, success) {
      const metric = this.metrics.get(eventName) || {
        processed: 0,
        failures: 0,
        totalDuration: 0
      };
  
      metric.processed += 1;
      if (!success) metric.failures += 1;
      metric.totalDuration += duration;
  
      this.metrics.set(eventName, metric);
    }
  
    getMetrics() {
      const result = {};
      for (const [eventName, metric] of this.metrics) {
        result[eventName] = {
          ...metric,
          averageDuration: metric.totalDuration / metric.processed,
          successRate: (metric.processed - metric.failures) / metric.processed
        };
      }
      return result;
    }
  }