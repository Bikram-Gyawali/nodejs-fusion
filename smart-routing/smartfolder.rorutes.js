// /routes/root.js
const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.send("GET"))
    .post((req, res) => res.send("POST"));
module.exports = router;

// /routes/home.js
const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.send("GET HOME"))
    .post((req, res) => res.send("POST HOME"));
module.exports = router;

// /routes/about.js
const express = require("express");
const router = express.Router();
