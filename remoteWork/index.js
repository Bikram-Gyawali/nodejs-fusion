require("dotenv").config();
const express = require("express");
const dbConnect = require("./db/dbConnect");
const app = express();
const loadWalletAndBalance = require("./routes/wallet.routes");

dbConnect();

app.use(express.json());

  loadWalletAndBalance();

const port = 3000;

app.listen(port, () => console.log("Listening to port " + port));
