var express = require('express');
var router = express.Router();
const randomizer = require('../helper/randomizer');

router.use(express.static(__basedir + "/public/javascripts"));
router.use(express.static(__basedir + "/public/stylesheets"));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(__basedir + '/public/html/index.html');
});

router.get('/ticket', function (req, res) {
  res.sendFile(__basedir + '/public/html/ticket.html');
});

router.get('/getTicket/:totalTickets', function (req, res) {
  let totalTickets = req.params.totalTickets;
  let tickets = [];
  while (totalTickets != 0) {
    tickets.push(randomizer.getTicket());
    totalTickets--;
  }
  res.send(tickets);
});

module.exports = router;
