const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    wallets: [{ account: { type: String }, balance: { type: String } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("walletBalance", WalletSchema);
