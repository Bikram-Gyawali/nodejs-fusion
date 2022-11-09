require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const app = express();

dbConnect();
app.use(express.json());
app.use(cors());

app.use("/api", movieRoutes);

const port = 3000;

app.listen(port, () => console.log("Listening to port " + port));
