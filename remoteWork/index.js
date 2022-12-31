require("dotenv").config();
const dbConnect = require("./db/dbConnect");
const express = require("express");
const app = express();
const {
  uploadWalletsandBalance,
  getWalletsAndBalance,
} = require("./routes/wallet.routes");
const scheduledTask = require("./utils/scheduledFetch");

//connect to database
try {
  dbConnect();
} catch (error) {
  throw new Error("Connection failed : ", { cause: error });
}

app.use(express.json());
app.use("/api", uploadWalletsandBalance); // to upload wallets and balance uncomment this
app.use("/api", getWalletsAndBalance);

scheduledTask();

const port = 3000;

app.listen(port, () => console.log("Listening to port " + port));
