const express = require("express");
const app = express();

// we can do this default 
// app.use(compression());

// or do this
const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // Will not compress responses, if this header is present
    return false;
  }
  // Resort to standard compression
  return compression.filter(req, res);
};// Compress all HTTP responses
app.use(compression({
  // filter: Decide if the answer should be compressed or not,
  // depending on the 'shouldCompress' function above
  filter: shouldCompress,
  // threshold: It is the byte threshold for the response 
  // body size before considering compression, the default is 1 kB
  threshold: 0
}));


app.get("/", (req, res) => {
  const favMarvelHero =
    "SpiderMan , IronMan , Thor , Bikram , Dr.Strange and Wanda Maxim (Hot)";

  res.send(favMarvelHero.repeat(1000));
});
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
