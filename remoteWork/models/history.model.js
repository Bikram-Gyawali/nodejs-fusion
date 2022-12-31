const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const {
  Types: { Long },
} = mongoose;

const HistorySchema = new mongoose.Schema(
  {
    wallets: [{ account: { type: String }, balance: { type: String } }],
  },
  { timestamps: true }
);

module.exports = HistorySchema;
