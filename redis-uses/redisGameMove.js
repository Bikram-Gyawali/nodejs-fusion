const redis = require("redis");
const client = redis.createClient();

client.subscribe("game:move");

client.on("message", function(channel, message) {
  console.log("Received move on channel " + channel + ": " + message);
});

client.publish("game:move", "Player1 moved to position (5,5)");