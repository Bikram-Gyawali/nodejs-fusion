const Joi = require('joi');

class Validator {
  // Initialization with a validation schema
  constructor(schema) {
    this.schema = schema;
  }
  // Method for validating data against the schema
  validate(data) {
    return this.schema.validate(data);
  }
}