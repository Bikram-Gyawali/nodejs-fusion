const walletAddress = require("./addressList");
const axios = require("axios");
const getBalance = async () => {
  //   for (let i = 0; i < walletAddress.length; i++) {
  try {
    const response = await axios
      .get(
        `https://api.bscscan.com/api?module=account&action=balancemulti&address=${walletAddress}&tag=latest&apikey=${process.env.API_KEY}`
      )
      .then((res) => console.log("Response", res.data));
  } catch (error) {
    console.log("error occured", error);
  }
};
// };

module.exports = getBalance;
