var express = require('express');
var router = express.Router();

var cors = require('cors')
var app = express()

const mysql = require('mysql2');
const db = mysql.createConnection({
  host    : '127.0.0.1',
  user    : 'root',
  password: 'root',
  database: 'testing',
  port    : 3306
});


router.get('/', cors(), function (req, res, next) {
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  var query = db.query('SELECT * FROM auctions', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send(results);
  });


});

router.get('/:id', cors(), function (req, res, next) {
    
    db.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  
    var query = db.query('SELECT auctions.*, bids.id, MAX(bids.amount) FROM auctions INNNER JOIN bids ON auctions.id = bids.auction_id WHERE auctions.id = ? ', [req.params.id], function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(results[0]);
    });
});

router.post('/', cors(), function (req, res, next) {
      
    db.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  
    var query = db.query('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES (?, ?, ?, ?, ?)', [req.body.name, req.body.base_price, req.body.base_price, req.body.start_date, req.body.end_date], function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(results);
    });
});

module.exports = router;
