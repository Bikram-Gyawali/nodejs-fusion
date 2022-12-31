const mongoose = require("mongoose");
const dbConnect = () => {
  dbClient = mongoose.connect(process.env.DB, { useNewUrlParser: true });

  mongoose.connection.on("connected", () => {
    console.log("Connected to db ");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error occured during connectiton", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Conection terminated");
  });
};

module.exports = dbConnect;
