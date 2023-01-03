const calcHlper = async (a, b) => {
  let amountCalculation = [];
  await a.map(async (itrA) => {
    await b.map((itrB) => {
      if (itrA.account === itrB.account) {
        let acN = new Object();
        acN.accountNo = itrA.account;
        acN.currentBalance = itrA.balance;
        acN.previousBalance = itrB.balance;
        acN.balanceDiff = BigInt(
          Math.abs(itrA.balance - itrB.balance)
        ).toString();
        acN.percentage =
          Math.round(
            ((acN.currentBalance - acN.previousBalance) / acN.previousBalance) *
              100
          ) + "%";
        amountCalculation.push(acN);
      }
    });
  });
  return amountCalculation;
};

module.exports = calcHlper;
