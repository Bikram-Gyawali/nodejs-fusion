const mongoose = require("mongoose");
const listCollections = async () => {
    let collectionList = [];
  mongoose.connection.on("open", function (ref) {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        for (i = 0; i < names.length; i++) {
        //   console.log(names[i].name); 
        collectionList.push(names[i].name);
      }
    });
  });
  return collectionList;
};

module.exports = listCollections;
