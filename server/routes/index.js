var express = require('express');
var router = express.Router();
const {verifyToken} = require('../middlewares/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', verifyToken, (req, res) => {
  res.send("Nggeh");
})

module.exports = router;
