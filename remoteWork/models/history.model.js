const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  data: { type: Array },
});

const HistorySchemas = new mongoose.Schema({
  data: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "walletBalance",
    },
  ],
});

module.exports = mongoose.model("histo", HistorySchemas);

module.exports = mongoose.model("history", HistorySchema);
