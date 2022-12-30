const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const {
  Types: { Long },
} = mongoose;
const WalletSchema = new mongoose.Schema(
  {
    wallets: [{ account: { type: String }, balance: { type: Long } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("walletBalance", WalletSchema);

// {
//   walletAddress: { type: String },
//   balance: { type: Number },
//   date: { type: Date },
// },

// {
//   account: { type: String },
//   balance: { type: Number },
// },
