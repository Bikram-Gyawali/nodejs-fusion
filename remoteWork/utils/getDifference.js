const HistorySchema = require("../models/history.model");
const calcHlper = require("./calcHelper");

let [oneDayArray, oneWeekArray, oneMonthArray] = [[], [], []];

const getDifference = async (oneDayDiff, sevenDayDiff, oneMonthDiff) => {
  let oneDayDiffA = Array.from(oneDayDiff).toString();
  let oneWeekDiffA = Array.from(sevenDayDiff).toString();
  let oneMonthDiffA = Array.from(oneMonthDiff).toString();
  oneDayDiffA.length = 2;
  oneWeekDiffA.length = 2;
  oneMonthDiffA.length = 2;

  const oneDayDifferenceBalance = async () => {
    let oneDay = await HistorySchema.find({}).exec();
    oneDay.map((res) => {
      if (oneDayDiffA.includes(res.data[0].createdAt.toString())) {
        oneDayArray.push(res.data[0].wallets);
      }
    });

  return  await calcHlper(oneDayArray[0], oneDayArray[1]);
  };

  const oneWeekDifferenceBalance = async () => {
    let oneWeek = await HistorySchema.find({}).exec();
    oneWeek.map((res) => {
      if (oneWeekDiffA.includes(res.data[0].createdAt.toString())) {
        oneWeekArray.push(res.data[0].wallets);
      }
    });

    return   await calcHlper(oneWeekArray[0], oneWeekArray[1]);
  };

  const oneMonthDifferenceBalance = async () => {
    let oneMonth = await HistorySchema.find({}).exec();
    oneMonth.map((res) => {
      if (oneMonthDiffA.includes(res.data[0].createdAt.toString())) {
        oneMonthArray.push(res.data[0].wallets);
      }
    });

    return await calcHlper(oneMonthArray[0], oneMonthArray[1]);
  };

  return {
    oneDayDifferenceBalance: await oneDayDifferenceBalance(),
    oneWeekDifferenceBalance: await oneWeekDifferenceBalance(),
    oneMonthDifferenceBalance: await oneMonthDifferenceBalance(),
  };
};

module.exports = getDifference;
