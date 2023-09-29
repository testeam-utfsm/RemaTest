var express = require('express');
var router = express.Router();

var cors = require('cors');
var app = express();

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'testing',
  port: 3306
});


router.get('/', cors(), function (req, res, next) {
  try {

    db.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });

    var query = db.query('SELECT * FROM auctions', function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(results);
    });

  } catch (err) {
    //
  }

});

router.get('/:id', cors(), function (req, res, next) {
  try {

    db.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });

    var query = db.query('SELECT *  FROM ( SELECT auctions.*, bids.amount, bids.id AS bids_id FROM auctions INNER JOIN bids ON auctions.id = bids.auction_id WHERE auctions.id = ? ) AS test ORDER BY amount DESC LIMIT 1;', [req.params.id], function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(results[0]);
    });
  } catch (err) {
    //
  }
});

router.post('/', cors(), function (req, res, next) {
  console.log("req.body.name: ", req.body.name);
  console.log("req.body.base_price: ", req.body.base_price);
  console.log("req.body.start_date: ", req.body.start_date);
  console.log("req.body.end_date: ", req.body.end_date);
  res.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Origin", "*");

  try {

    db.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });

    var query = db.query('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES (?, ?, ?, ?, ?)', [req.body.name, req.body.base_price, req.body.base_price, req.body.start_date, req.body.end_date], function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(results);
    });
  } catch (err) {
    //
  }
});

module.exports = router;
