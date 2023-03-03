const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => res.send("GET"));
app.post("/", (req, res) => res.send("POST"));
app.get("/home", (req, res) => res.send("GET HOME"));
app.post("/home", (req, res) => res.send("POST HOME"));
app.get("/about", (req, res) => res.send("GET HOME"));
app.post("/about", (req, res) => res.send("POST HOME"));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);