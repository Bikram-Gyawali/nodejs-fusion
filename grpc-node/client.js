const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("books.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const bookPackage = grpcObject.bookPackage;

const text = process.argv[2];

const client = new bookPackage.Book("localhost:50000", grpc.credentials.createInsecure())

client.createBook({
  "title": "title 3",
  "author": "Herod 3",
  "content": "Content 3"
}, (err, response) => {

  console.log("Book has been created " + JSON.stringify(response))

})

client.readBook({
  "id": 1
}, (err, response) => {

  console.log("Book has been read " + JSON.stringify(response))

})

client.updateBook({
  "id": 2,
  "title": "title 3",
  "author": "Herod 3",
  "content": "Content 3"
}, (err, response) => {

  console.log("Book has been updated " + JSON.stringify(response))

})

client.deleteBook({
  "id": 2,
}, (err, response) => {

  console.log("Book has been deleted " + JSON.stringify(response))

})

client.allBooks(null, (err, response) => {

  console.log("Read all books from database " + JSON.stringify(response))

})
