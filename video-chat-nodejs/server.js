const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
app.use(express.static("public"));
app.set("view engine", "ejs");

const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, { debug: true });
app.use("/peerjs", peerServer);

app.get("/", (req, res) => {
  res.redirect("${uuidv4()}");
});

app.get("/", function (req, res) {
  res.render("room");
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.param.room });
});


io.on("connection", (socket) => {socket.on("join-room", (roomId, userId) => {socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

server.listen(3000);
