const protoLoader = require("@grpc/proto-loader")
const grpc = require("@grpc/grpc-js");
const packageDef = protoLoader.loadSync("books.proto", {});
const grpcObject = grpc.loadPackageDefination(packageDef);
const bookPackage = grpcObject.bookPackage;

const server = new grpc.Server();

let books = [
    {id:'1',title:"note 1", author : "bikram", content: "content 1"},
    {id:'2',title:"note 2", author : "bikram 2", content: "content 2"}
]

server.addService(bookPackage.Book.service, {
    "allBooks": allBooks,
    "createBook": createBook,
    "readBook": readBook,
    "updateBook": updateBook,
    "deleteBook": deleteBook
});


function createBook ( call , callBack) { 
    const book = call.request;
    book.id = books.length + 1;
    books.push(book);
    callBack(null, {books} );
}


function readBook (call, callback) {
    const book = books.find(n => n.id == call.request.id);
  
    if (book) {
        callback(null, book);
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        });
    }
  }


  function updateBook (call, callback) {
    const existingBook = books.find(n => n.id == call.request.id);
    if (existingBook) {
        existingBook.title = call.request.title;
        existingBook.author = call.request.author;
        existingBook.content = call.request.content;
        callback(null, existingBook);
      } else {
          callback({
              code: grpc.status.NOT_FOUND,
                details: "Not found"
          });
      }
  }


  function deleteBook (call, callback) {
    const existingBookIndex = books.findIndex((n) => n.id == call.request.id)
    if (existingBookIndex != -1) {
       books.splice(existingBookIndex, 1)
       callback(null, {})
      } else {
          callback({
              code: grpc.status.NOT_FOUND,
              details: "Book not found"
          })
      }
  }
  
  function allBooks(call, callback) {
      callback(null, { books })
  }


  server.bindAsync("127.0.0.1:50000", grpc.ServerCredentials.createInsecure(), (error, port) => {
    server.start();
    console.log(`listening on port ${port}`);
    });