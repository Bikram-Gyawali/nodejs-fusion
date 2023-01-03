const moment = require("moment");

const getDaysDifference = async (dates) => {
  let oneDayDiff = new Set();
  let sevenDayDiff = new Set();
  let oneMonthDiff = new Set();
  await dates.map(async (date) => {
    await dates.map((date2) => {
      if (date !== date2) {
        let sub = moment(date);
        let sub1 = moment(date2);
        let daysDifference = sub.diff(sub1, "days") + 1;
        if (daysDifference == "1") {
          oneDayDiff.add(date);
          oneDayDiff.add(date2);
        }
        if (daysDifference == "7") {
          sevenDayDiff.add(date);
          sevenDayDiff.add(date2);
        }
        if (daysDifference == "30") {
          oneMonthDiff.add(date);
          oneMonthDiff.add(date2);
        }
      }
    });
  });

  return { oneDayDiff, sevenDayDiff, oneMonthDiff };

};

module.exports = getDaysDifference;
