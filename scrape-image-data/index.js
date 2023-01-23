// const express = requrie('express')
// let request = require('request')
// let cheerio = require('cheerio')
// var url = require('url')
// path = require('path')
// var fs = require('fs')

// const app = express()

// app.get('/', (res, res) => {
//   function getImages(uri) {
//     request(uri, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         $ = cheerio.load(body)
//         imgs = $('img').toArray()
//         console.log('Downloading...')
//         imgs.forEach(function (img) {
//           //console.log(img.attribs.src)
//           process.stdout.write('.')
//           img_url = img.attribs.src
//           if (/^https?:\/\//.test(img_url)) {
//             img_name = path.basename(img_url)
//             request(img_url).pipe(fs.createWriteStream(img_name))
//           }
//         })
//         console.log('Done!')
//       }
//     })
//   }
// })
// getImages('http://imgur.com/gallery')

// app.listen(3000, () => console.log('server runnig on port 3000'))



const cheerio = require('cheerio');
const axios = require('axios');

async function scrapeImages() {
  try {
    const response = await axios.get('https://example.com');
    const $ = cheerio.load(response.data);
    $('img').each((i, element) => {
      console.log($(element).attr('src'));
    });
  } catch (error) {
    console.log(error);
  }
}
