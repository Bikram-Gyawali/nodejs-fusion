const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect(
    "mongodb+srv://bikram:bikram123@wallet.zbwnbst.mongodb.net/test",
    { useNewUrlParser: true }
  );
  mongoose.connection.on("connected", () => {
    console.log("Conncted to db ");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error occured during connectiton", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Conection terminated");
  });
};

module.exports = dbConnect;
