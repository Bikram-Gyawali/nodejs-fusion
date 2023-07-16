const mongoose = require('mongoose');

class DatabaseHandler {
  // Initialization with database URI
  constructor(uri) {
    this.uri = uri;
  }
  // Method for connecting to database
  async connect() {
    await mongoose.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true});
  }
  // Method for disconnecting from database
  async disconnect() {
    await mongoose.disconnect();
  }
}