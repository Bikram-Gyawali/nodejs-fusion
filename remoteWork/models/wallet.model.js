const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    walletAddress: { type: String },
    balance: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("walletBalance", walletSchema);
