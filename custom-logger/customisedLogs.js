const winston = require('winston');

// Create a new instance of the Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs.log' })
  ]
});

// Middleware function to log requests and responses
const logMiddleware = (req, res, next) => {
  // Log the request data
  logger.info({
    message: 'Request received',
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body,
    formdata: req.files,
  });

  // Save the original response.send function
  const originalSend = res.send;

  // Override the response.send function to intercept the response body and log it
  res.send = function (body) {
    // Log the response data
    logger.info({
      message: 'Response sent',
      status: res.statusCode,
      body: body
    });

    // Call the original response.send function
    originalSend.call(this, body);
  };

  next();
};

// Add the logMiddleware to the app
app.use(logMiddleware);

