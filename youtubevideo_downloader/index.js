const express = require("express");
const app = express();
const port = 3000;
const ytdl = require("ytdl-core");
app.set("view engine", "ejs"); // OUR ROUTES WILL GO HERE

app.get("/", (req, res) => {
  return res.render("index");
});

//route to download
app.get("/download", async (req, res) => {
  const v_id = req.query.url.split("v=")[1];
  const info = await ytdl.getInfo(req.query.url);
  return res.render("download", {
    url: "https://www.youtube.com/embed/" + v_id,
    info: info.formats.sort((a, b) => {
      return a.mimeType < b.mimeType;
    }),
  });
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
