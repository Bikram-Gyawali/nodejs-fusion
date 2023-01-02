const WalletSchema = require("../models/wallet.model");
const getBalance = require("./getBalance");

const storeNewWalletBalance = async () => {
  await WalletSchema.deleteMany({});
  let wallets = new WalletSchema({ wallets: await getBalance() });
  wallets.save();
};

module.exports = storeNewWalletBalance;
