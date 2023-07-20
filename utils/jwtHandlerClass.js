// Importing jsonwebtoken for handling JWTsconst jwt = require('jsonwebtoken')class JWTHandler {  // Initialization with secret key  constructor(secretKey) {    this.secretKey = secretKey;  }  // Method for generating JWTs  generate(payload, expiresIn = '1h') {    return jwt.sign(payload, this.secretKey, {expiresIn});  }  // Method for verifying JWTs  verify(token) {    return jwt.verify(token, this.secretKey);  }}// Importing jsonwebtoken for handling JWTs
const jwt = require('jsonwebtoken')

class JWTHandler {
  // Initialization with secret key
  constructor(secretKey) {
    this.secretKey = secretKey;
  }
  // Method for generating JWTs
  generate(payload, expiresIn = '1h') {
    return jwt.sign(payload, this.secretKey, {expiresIn});
  }
  // Method for verifying JWTs
  verify(token) {
    return jwt.verify(token, this.secretKey);
  }
}