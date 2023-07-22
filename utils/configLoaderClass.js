// Importing fs for file system operationsconst fs = require('fs');class ConfigLoader {  // Method for loading configuration from JSON files  static load(configPath) {    const rawData = fs.readFileSync(configPath);    return JSON.parse(rawData);  }}// Importing fs for file system operations
const fs = require('fs');

class ConfigLoader {
  // Method for loading configuration from JSON files
  static load(configPath) {
    const rawData = fs.readFileSync(configPath);
    return JSON.parse(rawData);
  }
}