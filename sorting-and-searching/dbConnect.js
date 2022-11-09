const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect(process.env.DB, { useNewUrlParser: true });
  mongoose.connection.on("connected", () => {
    console.log("Conncted to db ");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error occured during connectiton");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Conection terminated");
  });
};

module.exports = dbConnect;
