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
router
    .route("/")
    .get((req, res) => res.send("GET ABOUT"))
    .post((req, res) => res.send("POST ABOUT"));
module.exports = router;

// index.js

const express = require("express");
const app = express();
const port = 3000;
app.use("/", require("./routes/root"));
app.use("/home", require("./routes/home"));
app.use("/about", require("./routes/about"));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);



// for proper understanding follow this tutorial of smart routig 
// https://betterprogramming.pub/how-to-write-smarter-routing-with-express-and-node-js-4cc53bbc55e5