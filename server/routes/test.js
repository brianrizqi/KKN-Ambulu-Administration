const express = require('express');
const router = express.Router();
var pdf = require("pdf-creator-node");
var fs = require('fs');
const MongoAPI = require('../configs/mongo');
const letterSeeder = require('../seeder/letter_categories');
const LetterService = require('../services/letter');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
var path = require('path');

router.get('/', async function (req, res, next) {
  const content = fs.readFileSync('./misc/templates/standard.docx', 'binary');
  var zip = new PizZip(content);
  var doc;
  try {
    doc = new Docxtemplater(zip);
  } catch (e) {
    res.send(e.message);
  }
  
  const data = {
    header: 'visible',
    letter_number: '1000 / 45.09.12.2004 / 2020',
    name: "Miqdad Yanuar Farcha",
    ttl: '20 Januari 1999',
    nationality: 'Indonesia',
    marriage_status: 'Menikah',
    religion: 'Islam',
    job: 'Developer',
    nik: '35091234123423',
    address_1: 'Perumahan BAP E-18 RT 2 RW 16',
    address_2: 'Ambulu Jember'
  };
  
  doc.setData(data);
  
  try {
    doc.render();
  } catch (e) {
    res.send(e.message);
  }
  
  var buf = doc.getZip()
    .generate({type: 'nodebuffer'});
  
  fs.writeFileSync(path.resolve('./misc/templates/', 'output.docx'), buf);
  
  res.send({
    message: 'done'
  });
});

router.get('/1', LetterService.getLetter);

module.exports = router;
