const express = require(“express”);
const app = express();
const server = require(“http”).Server(app);


app.set(‘view engine’, ‘ejs’)

app.get(“/”, (req, res) => {
    res.status(200).send(“Hello World”);
});
server.listen(3000);