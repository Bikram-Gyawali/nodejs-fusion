const mongoose = require("mongoose");
const dbStatus = async () => {
  await mongoose.connection.on("connected", () => {
    console.log("Connected to db ");
  });

  await mongoose.connection.on("error", (err) => {
    console.log("Error occured during connectiton", err);
  });

  await mongoose.connection.on("disconnected", () => {
    console.log("Conection terminated");
  });
  console.log("hello");
};

module.exports = dbStatus;
