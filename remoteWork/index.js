require("dotenv").config();
const express = require("express");
const dbConnect = require("./db/dbConnect");
const app = express();
const getBalance = require("./utils/getBalance");
const uploadAddressandBalance = require("./routes/wallet.routes");
dbConnect();

// getBalance();

app.use(express.json());
app.use("/api", uploadAddressandBalance);

const port = 3000;

app.listen(port, () => console.log("Listening to port " + port));
