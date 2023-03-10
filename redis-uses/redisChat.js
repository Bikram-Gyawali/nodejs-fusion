const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const redis = require("redis");
const redisClient = redis.createClient();

io.on("connection", function(socket) {
  socket.on("chat message", function(message) {
    redisClient.publish("chat", message);
  });

  redisClient.on("message", function(channel, message) {
    socket.emit("chat message", message);
  });

  redisClient.subscribe("chat");
});

http.listen(3000, function() {
  console.log("Chat app listening on port 3000");
});