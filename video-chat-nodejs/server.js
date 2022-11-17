const express = require("express");
const app = express();
const server = require("http").Server(app);

app.set("view engine", "ejs");

app.use(express.static("public"));
app.get("/", function (req, res) {
  res.render("room");
});
server.listen(3000);
