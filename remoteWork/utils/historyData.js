const HistorySchema = require("../models/history.model");
const getDaysDifference = require("./getDaysDifference");
const getDifference = require("./getDifference");
let dates = [];
const getHistoryData = async () => {
  try {
    let historyDetails = await HistorySchema.find();
    // console.log(historyDetails[0].data[0]);
    historyDetails.map((data) => {
      let arrayOfAddandBalance = data.data[0].wallets;
      // console.log(arrayOfAddandBalance);
      dates.push(data.data[0].createdAt);
    });
  } catch (err) {
    console.log(err);
    throw new Error("uploading to wallet collection failed:", err);
  }
  const { oneDayDiff, oneMonthDiff, sevenDayDiff } = await getDaysDifference(
    dates
  );
  const daysDifferenceBalanceResponse = await getDifference(
    oneDayDiff,
    sevenDayDiff,
    oneMonthDiff
  );
  return daysDifferenceBalanceResponse;
};

module.exports = getHistoryData;
