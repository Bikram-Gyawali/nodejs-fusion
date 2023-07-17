// Importing fs for file system operationsconst fs = require('fs');class Logger {  // Specifying the log file  constructor(logFile = 'app.log') {    this.logFile = logFile;  }  // Method for logging messages with timestamps  log(message) {    const date = new Date().toISOString();    fs.appendFileSync(this.logFile, `${date} - ${message}\\\\n`);  }}// Importing fs for file system operations
const fs = require('fs');

class Logger {
  // Specifying the log file
  constructor(logFile = 'app.log') {
    this.logFile = logFile;
  }
  // Method for logging messages with timestamps
  log(message) {
    const date = new Date().toISOString();
    fs.appendFileSync(this.logFile, `${date} - ${message}\\\\n`);
  }
}
