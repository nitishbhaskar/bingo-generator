var express = require('express');
var router = express.Router();

router.use(express.static(__basedir + "/public/javascripts"));
router.use(express.static(__basedir + "/public/stylesheets"));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(__basedir + '/public/html/index.html');
});

router.get('/getTicket', function (req, res) {

});

module.exports = router;
