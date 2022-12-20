const QRCode = require("qrcode");
const path = require("path");

QRCode.toFile(
  path.join(__dirname, "qrcode.png"),
  "https://bikramgyawali.netlify.app/",
  (err) => {
    if (err) throw err;
  }
);
