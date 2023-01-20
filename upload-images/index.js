// For creating the server
const express = require("express");
// For handling multimedia
const multer = require("multer");
// For working with the file and directory paths
const path = require("path");
// For interacting with the file system
const fs = require("fs");
// Provides access to utility functions
const util = require("util");
// ...such as this one to unlink or remove files from the file system
const unlinkFile = util.promisify(fs.unlink);

// INSERT MULTER MIDDLEWARE HERE ----------------------
// multer.diskStorage gives you full control of where to store the images
const storage = multer.diskStorage({
  // Choose a destination
  destination: function (req, file, cb) {
    // Lets store them in the uploads folder
    cb(null, "./public/uploads/");
  },
  // Choose a filename for each uploaded image
  filename: function (req, file, cb) {
    // Lets create a unique name for each image
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage, // Choose destination and filename
  limits: { fileSize: 1000000 }, // Set a max file size
  fileFilter: function (req, file, cb) {
    // Filter out certain files
    checkFileType(file, cb);
  },
}).any(); // accepts all files types coming in through the wire

// Port number the server will run on
const port = process.env.PORT || 3000;

// For creating an instance of the express module
const app = express();

// Middleware to deal with incoming data from the frontend
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// For setting EJS as the template engine
app.set("view engine", "ejs");

// For accessing the public folder
app.use(express.static("public"));

// INSERT ROUTES HERE ----------------------------------

// For runnng the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
