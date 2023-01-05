const express = require("express");
const session = require("express-session");
require("dotenv").config();
const app = express();
const port = 3000;
const rateLimit = require("express-rate-limit");
const secret = process.env.SESSION_SEC;
const store = new session.MemoryStore();

const protect = (req, res, next) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    res.sendStatus(401);
  } else {
    next();
  }
};

app.use(session({ secret, resave: false, saveUninitialized: true, store }));

app.get("/", (req, res) => {
  const { name = "user" } = req.query;
  res.send(`Hello ${name}!`);
});



app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 calls
  })
);
app.get("/login", (req, res) => {
  const { authenticated } = req.session;
  if (!authenticated) {
    req.session.authenticated = true;
    res.send("Successfully authenticated");
  } else {
    res.send("Already authenticated");
  }
});

app.get("/logout", protect, (req, res) => {
  req.session.destroy(() => {
    res.send("Successfully logged out");
  });
});

app.get("/protected", protect, (req, res) => {
  const { name = "guest user" } = req.query;
  res.send(`Hello ${name}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
