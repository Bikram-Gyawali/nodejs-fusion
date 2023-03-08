const redis = require('redis')
const client = redis.createClient()
// Subscribe to a channel
client.subscribe('channel1')
// Listen for messages on the channel
client.on('message', (channel, message) => {
  console.log(`Received message on channel ${channel}: ${message}`)
})
// Publish a message to the channel
client.publish('channel1', 'Hello, world!')

// In this example, we first create a Redis client and then subscribe to the “channel1” channel. We then listen for messages on the channel using the on method and log any messages received to the console. Finally, we publish a message to the “channel1” channel using the publish method.

// steps
// 1.Subscribe to a channel: To subscribe to a channel, you use the subscribe method on the Redis client.
// 2.Receive messages from a channel: To receive messages from a channel, you can use the on method on the Redis client to register a callback function that will be called when a message is received.
//3.Publish messages to a channel: To publish messages to a channel, you use the publish method on the Redis client.

// In conclusion, implementing Redis pub/sub in Node.js is a simple process that involves subscribing to a channel, receiving messages from a channel, and publishing messages to a channel. With these steps, you can build real-time applications with Node.js and Redis.
