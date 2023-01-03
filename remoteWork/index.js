require("dotenv").config();
const dbConnect = require("./db/dbConnect");
const express = require("express");
const app = express();
const {
  uploadWalletsandBalance,
  getWalletsAndBalance,
} = require("./routes/wallet.routes");
const scheduledTask = require("./utils/scheduledFetch");
const getCollectionsData = require("./utils/historyData");
const listCollections = require("./db/collectionList");
const getHistoryData = require("./utils/historyData");
const {
  getDailyBalance,
  getWeeklyBalance,
  getMonthlyBalance,
} = require("./routes/balance.routes");

const main = async () => {
  try {
    await dbConnect();
  } catch (error) {
    throw new Error("Connection failed : ", error);
  }

  app.use(express.json());
  app.use("/api", uploadWalletsandBalance); /// to upload wallets and balance uncomment this
  app.use("/api", getWalletsAndBalance);
  app.use("/api", getDailyBalance);
  app.use("/api", getWeeklyBalance);
  app.use("/api", getMonthlyBalance);

  await getHistoryData();
  // await listCollections();
  // console.log("in", await listCollections());
  // console.log("starting scheduling task");
  console.log("here index");
  // scheduledTask();

  const port = 8000;

  app.listen(port, () => console.log("Listening to port " + port));
};
(async () => {
  try {
    await main();
  } catch (e) {
    // Deal with the fact the chain failed
  }
})();
