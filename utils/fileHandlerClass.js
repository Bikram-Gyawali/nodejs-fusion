// Importing fs for file system operationsconst fs = require('fs');class FileHandler {  // Method for reading files  static read(path) {    return fs.readFileSync(path, 'utf-8');  }  // Method for writing to files  static write(path, data) {    fs.writeFileSync(path, data);  }  // Method for appending data to files  static append(path, data) {    fs.appendFileSync(path, data);  }}// Importing fs for file system operations
const fs = require('fs');

class FileHandler {
  // Method for reading files
  static read(path) {
    return fs.readFileSync(path, 'utf-8');
  }
  // Method for writing to files
  static write(path, data) {
    fs.writeFileSync(path, data);
  }
  // Method for appending data to files
  static append(path, data) {
    fs.appendFileSync(path, data);
  }
}