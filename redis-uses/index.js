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