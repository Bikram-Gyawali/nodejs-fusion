const winston = require('winston')
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/error/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/combinedlog.log' }),
  ],
})


// the logger will be used in nodejs app as 
app.app.get('/user', (req, res) => { 
    // Fetch user data
    logger.info('User data fetched successfully');
    res.send(userData);
  });
  
  app.post('/user', (req, res) => {
    // Save user data to database
    logger.info('User data saved successfully');
    res.send({ message: 'User data saved successfully' });
  });
  
  app.use((err, req, res, next) => {
    logger.error('An error occurred', { error: err });
    res.sendStatus(500);
  });