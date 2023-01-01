const HistorySchema = require("../models/history.model");
const moment = require("moment");
let dates = [];
let jsDates = new Date();
const getHistoryData = async () => {
  try {
    let historyDetails = await HistorySchema.find();
    historyDetails.map((data) => {
      let arrayOfAddandBalance = data.data[0].wallets;
      let date = data.data[0].createdAt;
      // console.log(new Date(date).getMinutes());
      dates.push(data.data[0].createdAt);
      arrayOfAddandBalance.map((res) => {
        // console.log(res);
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error("uploading to wallet collection failed:", err);
  }
  getDaysDifference();
};

const getDaysDifference = () => {
  dates.map((date) => {
    let toMom = moment(date);
    console.log( toMom.fromNow(date));
  });
};

module.exports = getHistoryData;


// moment(date).calendar()