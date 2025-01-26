class OrderSaga {
  async start(orderData) {
    const sagaId = generateUuid();

    try {
      // Step 1: Create Order
      await eventBus.publish("saga.createOrder", {
        sagaId,
        orderData,
      });

      // Step 2: Reserve Inventory
      await eventBus.publish("saga.reserveInventory", {
        sagaId,
        items: orderData.items,
      });

      // Step 3: Process Payment
      await eventBus.publish("saga.processPayment", {
        sagaId,
        paymentDetails: orderData.payment,
      });

      // Saga completed successfully
      await eventBus.publish("saga.completed", { sagaId });
    } catch (error) {
      // Trigger compensation transactions
      await this.compensate(sagaId, error);
    }
  }

  async compensate(sagaId, error) {
    await eventBus.publish("saga.compensation", {
      sagaId,
      error: error.message,
    });
  }
}