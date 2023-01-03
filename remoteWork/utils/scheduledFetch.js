var cron = require("node-cron");
const storeNewWalletBalance = require("./storeWallets");
const moveCollections = require("./moveCollections");

let scheduledTask = async () =>
  cron.schedule("*/5 * * * *", async () => {
    console.log("inside schedule");
    try {
      await storeNewWalletBalance();
    } catch (error) {
      console.log("error on schedule task block 1", error);
      return error;
    } finally {
      try {
        await moveCollections();
      } catch (error) {
        console.log("error on schedule task block 2");
        return error;
      }
    }
  });

module.exports = scheduledTask;
