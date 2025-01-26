class EventStore {
    constructor() {
      this.events = [];
    }
  
    async append(streamId, event) {
      const storedEvent = {
        streamId,
        eventType: event.type,
        data: event.data,
        metadata: {
          timestamp: new Date(),
          version: this.events.length + 1
        }
      };
  
      this.events.push(storedEvent);
      await eventBus.publish('event.stored', storedEvent);
    }
  
    async getStream(streamId) {
      return this.events.filter(event => event.streamId === streamId);
    }
  }
  
  // orderAggregate.js
  class OrderAggregate {
    constructor(id) {
      this.id = id;
      this.state = {};
    }
  
    async loadFromHistory() {
      const events = await eventStore.getStream(this.id);
      events.forEach(event => this.apply(event));
    }
  
    apply(event) {
      switch (event.eventType) {
        case 'OrderCreated':
          this.state = {
            ...this.state,
            status: 'created',
            items: event.data.items
          };
          break;
        case 'OrderPaid':
          this.state.status = 'paid';
          this.state.paymentDetails = event.data.payment;
          break;
        // Handle other event types
      }
    }
  }