const mongoose = require("mongoose");
const listCollections = async () => {
  let list = [];
  const colList = await mongoose.connection.db.listCollections().toArray();
  list = colList.map((item) => item.name);
  return list;
};

module.exports = listCollections;
