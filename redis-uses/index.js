const redis = require("redis");
const client = redis.createClient();
// Subscribe to a channel
client.subscribe("channel1");
// Listen for messages on the channel
client.on("message", (channel, message) => {
  console.log(`Received message on channel ${channel}: ${message}`);
});
// Publish a message to the channel
client.publish("channel1", "Hello, world!");

// In this example, we first create a Redis client and then subscribe to the “channel1” channel. We then listen for messages on the channel using the on method and log any messages received to the console. Finally, we publish a message to the “channel1” channel using the publish method.