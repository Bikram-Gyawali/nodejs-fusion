const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  data: { type: Array },
});

module.exports = mongoose.model("history", HistorySchema);
