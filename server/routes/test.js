const express = require('express');
const router = express.Router();
var pdf = require("pdf-creator-node");
var fs = require('fs');

/* GET home page. */
router.get('/', async function(req, res, next) {
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
