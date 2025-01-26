const amqp = require('amqplib');

class EventBus {
  constructor() {
    // We'll store our connection and channel here
    this.connection = null;
    this.channel = null;
    
    // Keep track of registered handlers
    this.handlers = new Map();
    
    // Store retry configurations
    this.retryConfig = {
      maxAttempts: 3,
      initialDelay: 1000, 
      maxDelay: 5000
    };
  }

  async connect() {
    try {
      // Create connection with retry mechanism
      this.connection = await this.withRetry(
        () => amqp.connect(process.env.RABBITMQ_URL)
      );

      // Create channel with retry mechanism
      this.channel = await this.withRetry(
        () => this.connection.createChannel()
      );

      // Handle connection failures
      this.connection.on('error', this.handleConnectionError.bind(this));
      this.connection.on('close', this.handleConnectionClosure.bind(this));

      console.log('Successfully connected to RabbitMQ');
    } catch (error) {
      console.error('Failed to establish connection:', error);
      throw error;
    }
  }

  async withRetry(operation, attempt = 1) {
    try {
      return await operation();
    } catch (error) {
      if (attempt >= this.retryConfig.maxAttempts) {
        throw error;
      }

      const delay = Math.min(
        this.retryConfig.initialDelay * Math.pow(2, attempt - 1),
        this.retryConfig.maxDelay
      );

      await new Promise(resolve => setTimeout(resolve, delay));
      return this.withRetry(operation, attempt + 1);
    }
  }

  async publish(eventName, data, options = {}) {
    if (!this.channel) {
      throw new Error('Not connected to message broker');
    }

    // Ensure exchange exists
    await this.channel.assertExchange(eventName, 'fanout', { durable: true });

    // Create message with metadata
    const message = {
      data,
      metadata: {
        timestamp: new Date().toISOString(),
        correlationId: options.correlationId || generateUuid(),
        source: process.env.SERVICE_NAME,
        version: '1.0'
      }
    };

    // Publish with confirmation
    return new Promise((resolve, reject) => {
      this.channel.publish(
        eventName,
        '',
        Buffer.from(JSON.stringify(message)),
        {
          persistent: true,
          ...options
        },
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async subscribe(eventName, handler, options = {}) {
    if (!this.channel) {
      throw new Error('Not connected to message broker');
    }

    // Create exchange and queue
    await this.channel.assertExchange(eventName, 'fanout', { durable: true });
    const queue = await this.channel.assertQueue('', { exclusive: true });

    // Bind queue to exchange
    await this.channel.bindQueue(queue.queue, eventName, '');

    // Store handler reference
    this.handlers.set(queue.queue, handler);

    // Set up consumer with error handling and logging
    await this.channel.consume(
      queue.queue,
      async (msg) => {
        if (!msg) return;

        try {
          const message = JSON.parse(msg.content.toString());
          console.log(`Processing event: ${eventName}`, {
            correlationId: message.metadata.correlationId
          });

          await handler(message.data, message.metadata);
          this.channel.ack(msg);
        } catch (error) {
          console.error(`Error processing event: ${eventName}`, {
            error,
            msg: msg.content.toString()
          });

          // Handle failed processing based on retry policy
          if (msg.properties.headers['x-death']?.length >= options.maxRetries) {
            // Move to dead letter queue
            await this.handleDeadLetter(eventName, msg);
            this.channel.ack(msg);
          } else {
            // Retry with exponential backoff
            this.channel.nack(msg, false, false);
          }
        }
      },
      { noAck: false }
    );
  }

  async handleDeadLetter(eventName, msg) {
    const deadLetterExchange = `${eventName}.deadletter`;
    await this.channel.assertExchange(deadLetterExchange, 'fanout', { durable: true });
    
    const deadLetterQueue = await this.channel.assertQueue(
      `${eventName}.deadletter.queue`,
      { durable: true }
    );

    await this.channel.bindQueue(
      deadLetterQueue.queue,
      deadLetterExchange,
      ''
    );

    await this.channel.publish(
      deadLetterExchange,
      '',
      msg.content,
      {
        headers: {
          'x-original-exchange': eventName,
          'x-error-time': new Date().toISOString()
        }
      }
    );
  }

  async handleConnectionError(error) {
    console.error('Connection error:', error);
    await this.reconnect();
  }

  async handleConnectionClosure() {
    console.warn('Connection closed, attempting to reconnect...');
    await this.reconnect();
  }

  async reconnect() {
    try {
      await this.connect();
      // Resubscribe all handlers
      for (const [queue, handler] of this.handlers) {
        await this.subscribe(queue, handler);
      }
    } catch (error) {
      console.error('Failed to reconnect:', error);
      // Schedule another reconnection attempt
      setTimeout(() => this.reconnect(), 5000);
    }
  }
}

module.exports = new EventBus();