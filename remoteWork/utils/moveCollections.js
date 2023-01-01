const HistorySchema = require("../models/history.model");
const WalletSchema = require("../models/wallet.model");
const moveCollections = async () => {
  try {
    let walletsDetails = await WalletSchema.find();
    if ((await walletsDetails[0]) != undefined) {
      console.log("wd", walletsDetails[0]);
      let historyForWallet = new HistorySchema({
        data: walletsDetails[0],
      });
      historyForWallet.save();
    }
  } catch (error) {
    console.log("error while moving collections", error);
    return error;
  }
};

module.exports = moveCollections;
