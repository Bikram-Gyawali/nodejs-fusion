const express = require("express");
const session = require("express-session");
const app = express();
const rateLimit = require("express-rate-limit");
const store = new session.MemoryStore();
const winston = require("winston");
const expressWinston = require("express-winston");
const responseTime = require("response-time");
const cors = require("cors");
const helmet = require("helmet");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./config");
const secret = config.sessionSecret;
const port = config.serverPort;

const alwaysAllow = (_1, _2, next) => {
  next();
};
const protect = (req, res, next) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    res.sendStatus(401);
  } else {
    next();
  }
};

app.disable("x-powered-by");
app.use(cors());
app.use(helmet());
app.use(session({ secret, resave: false, saveUninitialized: true, store }));

app.use(responseTime());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.json(),
    statusLevels: true,
    meta: false,
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    expressFormat: true,
    ignoreRoute() {
      return false;
    },
  })
);

app.use(rateLimit(config.rate));

app.get("/login", (req, res) => {
  const { authenticated } = req.session;
  if (!authenticated) {
    req.session.authenticated = true;
    res.send("Successfully authenticated");
  } else {
    res.send("Already authenticated");
  }
});

Object.keys(config.proxies).forEach((path) => {
  const { protected, ...options } = config.proxies[path];
  const check = protected ? protect : alwaysAllow;
  app.use(path, check, createProxyMiddleware(options));
});

app.get("/logout", protect, (req, res) => {
  req.session.destroy(() => {
    res.send("Successfully logged out");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
