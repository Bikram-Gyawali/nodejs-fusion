const express = require("express");
const app = express();
app.use(compression());
app.get("/", (req, res) => {
  const favMarvelHero =
    "SpiderMan , IronMan , Thor , Bikram , Dr.Strange and Wanda Maxim (Hot)";

  res.send(favMarvelHero.repeat(1000));
});
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
