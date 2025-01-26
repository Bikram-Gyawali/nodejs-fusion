const eventBus = require('./eventBus');

class OrderService {
  async createOrder(orderData) {
    // Validate order
    this.validateOrder(orderData);

    // Create order in database
    const order = await this.saveOrder(orderData);

    // Publish order created event
    await eventBus.publish('order.created', {
      orderId: order.id,
      customerId: order.customerId,
      items: order.items,
      total: order.total
    });

    return order;
  }

  async handleOrderPaymentReceived(paymentData, metadata) {
    const order = await this.getOrder(paymentData.orderId);
    
    // Update order status
    order.status = 'paid';
    await order.save();

    // Trigger fulfillment process
    await eventBus.publish('order.readyForFulfillment', {
      orderId: order.id,
      shippingDetails: order.shippingDetails
    });
  }
}