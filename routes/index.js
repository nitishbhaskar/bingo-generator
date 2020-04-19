var express = require('express');
var router = express.Router();
const randomizer = require('../helper/randomizer');

router.use(express.static(__basedir + "/public/javascripts"));
router.use(express.static(__basedir + "/public/stylesheets"));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(__basedir + '/public/html/index.html');
});

router.get('/getTicket', function (req, res) {
  res.send(randomizer.generateRandomNumberList());
});

module.exports = router;
