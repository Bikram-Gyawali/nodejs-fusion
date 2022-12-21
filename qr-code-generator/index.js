const QRCode = require("qrcode");
const path = require("path");

QRCode.toFile(
  path.join(__dirname, "qrcode.png"),
  "google.com",
  (err) => {
    if (err) throw err;
  }
);
