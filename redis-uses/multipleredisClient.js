const redis = require("redis");
const client1 = redis.createClient();
const client2 = redis.createClient();

client1.subscribe("channel1");
client2.subscribe("channel1");

client1.on("message", function(channel, message) {
  console.log("Client 1 received message on channel " + channel + ": " + message);
});

client2.on("message", function(channel, message) {
  console.log("Client 2 received message on channel " + channel + ": " + message);
});

for (let i = 0; i < 100000; i++) {
  client1.publish("channel1", "Hello, world!");
}