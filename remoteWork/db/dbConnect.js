const mongoose = require("mongoose");
const dbConnect = async () => {
  await mongoose.connect(process.env.DB, { useNewUrlParser: true });
  console.log("connected to database");
};

module.exports = dbConnect;
