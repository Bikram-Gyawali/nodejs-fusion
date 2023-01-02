const walletAddress = require("./addressList");
const axios = require("axios");

const getBalance = async () => {
  //   for (let i = 0; i < 20; i++) {
  walletAddress.length = 5;
  try {
    let response = await axios
      .get(
        `https://api.bscscan.com/api?module=account&action=balancemulti&address=${walletAddress}&tag=latest&apikey=${process.env.API_KEY}`
      )
      .then(
        (res) => res.data.result
        // console.log("Response")
      );
    return response;
  } catch (error) {
    // console.log("error occured");
    return error;
  }
};
// };

module.exports = getBalance;
