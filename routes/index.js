var express = require('express');
var router = express.Router();
const request = require('request');
const fifteenNumbersTicket = require('../helper/fifteenNumbersTicket');
const thirtyNumbersTicket = require('../helper/thirtyNumbersTicket');
const randomNumberUrl = "https://www.random.org/sequences/?min=1&max=90&col=1&format=plain&rnd=new";

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
    tickets.push(fifteenNumbersTicket.getTicket());
    totalTickets--;
  }
  res.send(tickets);
});

router.get('/get30NumTicket/:totalTickets', function (req, res) {
  let totalTickets = req.params.totalTickets;
  let tickets = [];
  while (totalTickets != 0) {
    tickets.push(thirtyNumbersTicket.getTicket());
    totalTickets--;
  }
  res.send(tickets);
});

router.get('/getRandomNumbers', function (req, res) {
  try {
    request.get({
      url: randomNumberUrl
    }, (error, response, body) => {
      res.send(body)
    })

  } catch (error) {
    res.send(error)
  }
});

module.exports = router;
