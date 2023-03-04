const express = require("express");
const app = express();
const port = 3000;
app.route("/")
    .get((req, res) => res.send("GET"))
    .post((req, res) => res.send("POST"));
app.route("/home")
    .get((req, res) => res.send("GET HOME"))
    .post((req, res) => res.send("POST HOME"));
app.route("/about")
    .get((req, res) => res.send("GET HOME"))
    .post((req, res) => res.send("POST HOME"));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);