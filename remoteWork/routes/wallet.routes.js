const router = require("express").Router();

const wallet = require("../models/wallet.model");

const axios = require("axios");

let walletAddreess = [
  "0x0000000000000000000000000000000000001004",
  "0xf977814e90da44bfa03b6295a0616a897441acec",
  "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
  "0x4b16c5de96eb2117bbe5fd171e4d203624b014aa",
  "0xa07c5b74c9b40447a954e1466938b865b6bbea36",
  "0x489a8756c18c0b8b24ec2a2b9ff3d4d447f79bec",
  "0x5a52e96bacdabb82fd05763e25335261b270efcb",
  "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
  "0x000000000000000000000000000000000000dead",
  "0xb428523cdda53640a62e9f26c2d8613a9159b282",
  "0x0966602e47f6a3ca5692529f1d54ecd1d9b09175",
  "0x1e34a77868e19a6647b1f2f47b51ed72dede95dd",
  "0x21d45650db732ce5df77685d6021d7d5d1da807f",
  "0xd183f2bbf8b28d9fec8367cb06fe72b88778c86b",
  "0xd6216fc19db775df9774a6e33526131da7d19a2c",
  "0xfd6042df3d74ce9959922fec559d7995f3933c55",
  "0x50dfef1566462cbc9c76b0e47b814c4315e3df63",
  "0x36236fa003ac2e5371e3264276f82d355180a102",
  "0xf9570d56b233ca5ff0211ab20aad93b8b6370b3a",
  "0xb7ad8cea00cd6d66ee50577da807916f37b09e04",
  "0x379d16a0dd3ca0e8b9a96fc2ccf372d75ea39a8c",
  "0x350b73dd5b7c93a5f6ee735343b61b1d044a32ea",
  "0x5616e2b8acff064bf902b8a93cbd5da2ca1edc7c",
  "0x6560ed767d6003d779f60bccd2d7b168cd4a1583",
  "0x9e647c2c10323f5d8c22d19b554ed9cbc5638e18",
  "0x2c78b4b5e40f78f5bfa6fce0b277d2c59ccf8545",
  "0xd3e9d15c83ad059119e5ca7eba4615f0986533fe",
  "0x0548f59fee79f8832c299e01dca5c76f034f558e",
  "0xf89d7b9c864f589bbf53a82105107622b35eaa40",
  "0x5770815b0c2a09a43c9e5aecb7e2f3886075b605",
  "0x0cd6388f6768a4edf88d0e42aa42c87a5a43ae4e",
  "0xf47f0b89ac60456a054cd6a03f535d990c83b9ef",
  "0xf983719ca77ded7e2cb7a6040b8b4c31db5cdcbf",
  "0x505d1180061727c59ce04e7acfc117283cf797f0",
  "0xefdca55e4bce6c1d535cb2d0687b5567eef2ae83",
  "0x6891a233bca9e72a078bcb71ba02ad482a44e8c1",
  "0x845cbcb8230197f733b59cfe1795f282786f212c",
  "0x3a67638883eff7856b286ccd373d36476c45407a",
  "0x1eccd85c9e21f247fadb70f6cff94b14cb737d03",
  "0xd8a184bbeb7098e45a7bdce1f88bfb5785cb22ba",
  "0xe8fbda2ac282a0ebb73d3f4089ad130312edb8da",
  "0xdaa3b5ae0521264e55f45157eb6e158e1f3e5012",
  "0x427e2cb82551d247daa712ebecf5fac7f1d955ad",
  "0xa2ff973bf5a7c33ce4591226b03cf0afc5f16d37",
  "0xe2fc31f816a9b94326492132018c3aecc4a93ae1",
  "0x87b1acce6a1958e522233a737313c086551a5c76",
  "0x01c952174c24e1210d26961d456a77a39e1f0bb0",
  "0x4e7388199254abd454e8d51d8e2b70eb0af4d740",
  "0x436f6186cd323abd8433bf1311389e561356b3b5",
  "0x139dc3941a1069df9da10b189c3e6386b5aa4d01",
  "0x34e794ce445f428705ac9b7c9f45ee70cdd769bc",
  "0x483456aed1c5dc77fda49c96fae52fcb718a170d",
  "0x50e447a6aa7d9addee7e28f95009a111c1d93a77",
  "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
  "0x006e2d523ec4ec1ad261fbbcd192659f0b35b975",
  "0x430b19f04aa885afee205feef5dbf60429f1a9c2",
  "0xf815ffa6c2ef93affb64bbc3f2d8b61f1b45d350",
  "0x536d770b8c5e49fb3d4845afc2ad3aa752b01b62",
  "0x97df8f5982164bfc4cc109e9a1a8899299484c1c",
  "0x73f5ebe90f27b46ea12e5795d16c4b408b19cc6f",
  "0xaa5bc284e38d1eed890d6de8fdba10c30967ecd1",
  "0xda07f1603a1c514b2f4362f3eae7224a9cdefaf9",
  "0xf6df3df65d0a75fc7c34afdad901be1c25de32bf",
  "0x53bece50c629a5c910a5db2a63a8266fd985392f",
  "0x1fbe2acee135d991592f167ac371f3dd893a508b",
  "0x4c004c4fb925be396f902de262f2817deebc22ec",
  "0xe647b0db71985b26a1562be585bf270ea4023b10",
  "0x6c85006eae121cf2444f0852cab9914607915df2",
  "0x0d0707963952f2fba59dd06f2b425ace40b492fe",
  "0x4cc7a9a050a90b73ef1122a4fa665a9dd11683a8",
  "0xb8e6d31e7b212b2b7250ee9c26c56cebbfbe6b23",
  "0x34878f6a484005aa90e7188a546ea9e52b538f6f",
  "0xcec75f3af8b3b0904ba1aeb1f98337cd5350e17f",
  "0x3c783c21a0383057d128bae431894a5c19f9cf06",
  "0x4c0f9d61f6b76d0ec8d3abada5ba4d2c3192f1a8",
  "0xa180fe01b906a1be37be6c534a3300785b20d947",
  "0xd15a9a3a1b833552d57b5e11e963bdf1ecabe084",
  "0xc4920f5803553bdaa844ac9b9f54220fa9decabb",
  "0xf04ad335bfea52d76e34e5460e582dc8768d676f",
  "0x3bb5f6285c312fc7e1877244103036ebbeda193d",
  "0x1a24a7d920eb6379c27187a5a1171d216f00b2a4",
  "0x6238872a0bd9f0e19073695532a7ed77ce93c69e",
  "0x3b5a23f6207d87b423c6789d2625ea620423b32d",
  "0x81d8068ff88bb058878017d2a613fd55936ff599",
  "0xff7f2207d6be0d46e05226fa0989703f9af92682",
  "0x00de99c90e8971d3e1c9cba724381b537f6e88c1",
  "0x2909cdd43edcac43d569586b1bed70cdfd9d50f8",
  "0x69dfd48e3a8a59af95899cf0f4f5849512090bd6",
  "0x29bdfbf7d27462a2d115748ace2bd71a2646946c",
  "0xe0c88ebf917ac4b661d08307dfd83c48e7b8aa2b",
  "0xe2e912f0b1b5961be7cb0d6dbb4a920ace06cd99",
  "0x515b72ed8a97f42c568d6a143232775018f133c8",
  "0x536b2025e1975da419a8bad66c34c5a16538d6f8",
  "0x91dca37856240e5e1906222ec79278b16420dc92",
  "0x813bc3dc7fc8fd882d86f50df142cd797400397e",
  "0x2fab7f72b4765606897f990c1f734e28eabd36d5",
  "0x54b55662901af57b31fb6b52af8175b652a5816e",
  "0x635308e731a878741bfec299e67f5fd28c7553d9",
  "0x089a4055b37e033675538513d84841b99a32226e",
  "0xf10ffd1ce9a2f2c1907f30bb874d880a5fcc1b9f",
];

let filtereedAddress = [];
for (i = 0; i < walletAddreess.length; i++) {
  filtereedAddress.push(walletAddreess[i].replace(/["]+/g, ""));
}
// console.log("filtered", filtereedAddress);
const loadWalletAndBalance =  async() => {
  for (let i = 0; i < walletAddreess.length; i++) {
    // setInterval(async () => {
      try {
        const response = await axios
          .get(
            `https://api.bscscan.com/api?module=account&action=balancemulti&address=${filtereedAddress}&tag=latest&apikey=5PZ437S1XSXV1I7NA6QUXSNDXX6NKZXW9X`
          )
          .then((res) => console.log("Response", res.data));
      } catch (error) {
        console.log("error occured", error);
      }
    // }, 4000);
  }
};

module.exports = loadWalletAndBalance;
