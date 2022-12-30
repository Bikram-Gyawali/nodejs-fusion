const WalletSchema = require("../models/wallet.model");
const getBalance = require("../utils/getBalance");

const router = require("express").Router();

router.post("/uploadWalletsandBalance", async (req, res) => {
  console.log("here i am", await getBalance());
  try {
    //create new wallets
    const wallets = new WalletSchema({
      wallets: await getBalance(),
    });

    const walletAddnBalance = await wallets.save();
    res.status(200).json(walletAddnBalance);
    console.log("response to upload", wallets);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
