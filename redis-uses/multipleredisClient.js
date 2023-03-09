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

// In this example, we create two Redis clients and subscribe them both to the channel1 channel. We then publish 100,000 messages to the channel1 channel and observe that both clients receive the messages quickly and efficiently.

// In conclusion, using Redis pub/sub for real-time communication in your applications can bring several advantages, such as scalability, flexibility, performance, and decoupling. By leveraging these benefits, you can build high-performing, scalable, and maintainable real-time applications.