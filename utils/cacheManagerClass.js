// Importing node-cache for caching operationsconst NodeCache = require('node-cache');const myCache = new NodeCache();class CacheManager {  // Method for setting cache  static set(key, value, ttl = 10000) {    myCache.set(key, value, ttl);  }  // Method for getting cache  static get(key) {    return myCache.get(key);  }}// Importing node-cache for caching operations
const NodeCache = require('node-cache');
const myCache = new NodeCache();

class CacheManager {
  // Method for setting cache
  static set(key, value, ttl = 10000) {
    myCache.set(key, value, ttl);
  }
  // Method for getting cache
  static get(key) {
    return myCache.get(key);
  }
}