const mongoose = require("mongoose");

const BalanceChange = new mongoose.Schema(
  {
    daily: { type: Number },
    weekly: { type: Number },
    monthly: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("balanceChange", BalanceChange);
