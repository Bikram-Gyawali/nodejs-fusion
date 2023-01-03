const getHistoryData = require("../utils/historyData");
const router = require("express").Router();

const getDailyBalance = router.get(
  "/getDailyBalanceStatus",
  async (req, res) => {
    try {
      let oneDayRes = await getHistoryData();
      console.log("one", oneDayRes.oneDayDifferenceBalance);
      res.status(200).json(oneDayRes.oneDayDifferenceBalance);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

const getWeeklyBalance = router.get(
  "/getWeeklyBalanceStatus",
  async (req, res) => {
    try {
      let oneWeekRes = await getHistoryData();
      console.log("one", oneWeekRes.oneWeekDifferenceBalance);
      res.status(200).json(oneWeekRes.oneWeekDifferenceBalance);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

const getMonthlyBalance = router.get(
  "/getMonthlyBalanceStatus",
  async (req, res) => {
    try {
      let oneDayRes = await getHistoryData();
      console.log("one", oneDayRes.oneMonthDifferenceBalance);
      res.status(200).json(oneDayRes.oneMonthDifferenceBalance);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
      throw new Error("daily balance status failed", error);
    }
  }
);

module.exports = { getDailyBalance, getWeeklyBalance, getMonthlyBalance };
