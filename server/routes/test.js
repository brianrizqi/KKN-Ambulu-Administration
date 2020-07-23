const express = require('express');
const router = express.Router();
var pdf = require("pdf-creator-node");
var fs = require('fs');
const MongoAPI = require('../configs/mongo');
const letterSeeder = require('../seeder/letter_categories');

router.get('/', async function (req, res, next) {
  const response = await MongoAPI.updateOne({
    slug: 'pindah-nikah'
  }, {
    counter: 2
  }, 'letter_categories');
  res.send(response);
  
  return;
  const html = fs.readFileSync('./misc/templates/test.html', 'utf-8');
  const options = {
    format: "A4",
    orientation: "potrait"
  };
  const data = {
    name: "Miqdad",
    text: "lorem ipsum gannnn"
  };
  console.log("asd");
  
  const document = {
    html,
    data,
    path: "./test.pdf"
  }
  
  pdf.create(document)
    .then(res => {
      console.log(res)
    });
  
});

module.exports = router;
