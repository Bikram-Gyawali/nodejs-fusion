const WalletSchema = require("../models/wallet.model");
const getBalance = require("../utils/getBalance");

const router = require("express").Router();

const uploadWalletsandBalance = router.post(
  "/WalletsAndBalance",
  async (req, res) => {
    try {
      let wallets = new WalletSchema({
        wallets: await getBalance(),
      });

      let walletAddnBalance = await wallets.save();
      return res.status(200).json(walletAddnBalance);
    } catch (error) {
      res.status(500).json(error);
      throw new Error("uploading to wallet collection failed:", {
        cause: error,
      });
    }
  }
);

const getWalletsAndBalance = router.get(
  "/getWalletsAndBalance",
  async (req, res) => {
    try {
      let walletsDetails = await WalletSchema.find();
      console.log("wd", walletsDetails[0]);
      return res.status(200).json(walletsDetails);
    } catch (error) {
      console.log("error on routes:", error);
      return res.status(500).json(error);
    }
  }
);

module.exports = { uploadWalletsandBalance, getWalletsAndBalance };
