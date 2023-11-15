var express = require('express');
var router = express.Router();

var cors = require('cors');
var app = express();

const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'rematest-db',
  user: 'root',
  password: 'root',
  database: 'testing',
  port: 3306
});


router.get('/', cors(), function (req, res, next) {
  try {

    db.connect(function (err) {
      if (err) throw err;
    });

    var query = db.query('SELECT * FROM auctions', function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });

  } catch (err) {
    //
  }

});

router.get('/search', cors(), function (req, res, next) {
  try {
    db.connect(function (err) {
      if (err) throw err;
    });

    db.query('SELECT * FROM auctions WHERE name LIKE ?', ['%' + req.query.name + '%'], function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  } catch (err) {
    // 
  }
});

router.delete('/:id', cors(), function (req, res, next) {
  try {
    db.connect(function (err) {
      if (err) throw err;
    });
    
    db.query('SELECT * FROM auctions WHERE id = ?', [req.params.id], function (error, results, fields) {
      if (error) throw error;
      let now = new Date();
      let start_date = new Date(results[0].start_date);
      let diff = now - start_date;
      let minutes = Math.floor(diff / 1000 / 60);
      if (minutes > 60) {
        r = { error: 'Auction is older than 1 hour' }
        res.send(r);
      } else {


        db.query('SELECT * FROM bids WHERE auction_id = ?', [req.params.id], function (error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            r = { error: 'Auction has bids' };
            res.send(r);
          } else {
            db.query('DELETE FROM auctions WHERE id = ?', [req.params.id], function (error, results, fields) {
              if (error) throw error;
              res.send(results);
            });
          }
        });
      }
    });
  } catch (err) {
    // 
  }
});

router.put('/:id', cors(), function (req, res, next) {
  
  try {
    db.connect(function (err) {
      if (err) throw err;
    });

    db.connect(function (err) {
      if (err) throw err;
    });

    db.query('SELECT * FROM auctions WHERE id = ?', [req.params.id], function (error, results, fields) {
      if (error) throw error;
      let now = new Date();
      let end_date = new Date(results[0].end_date);
      let diff = now - end_date;
      let minutes = Math.floor(diff / 1000 / 60);
      if (minutes > 60) {
        r = { error: 'Auction is older than 1 hour' }
        res.send(r);
      } else {
        db.query('SELECT * FROM bids WHERE auction_id = ?', [req.params.id], function (error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
            r = { error: 'Auction has bids' };
            res.send(r);
          } else {


            db.query('UPDATE auctions SET name = ?, base_price = ?, start_date = ?, end_date = ? WHERE id = ?', [
                req.body.name, req.body.base_price, req.body.start_date, req.body.end_date, req.params.id],
                function (error, results, fields) {
              if (error) throw error;
              res.send(results);
            });
          }
        });
      }
    });
  } catch (err) {
    // 
  }
});

router.post('/', cors(), function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // req.header("Access-Control-Allow-Origin", "*");

  try {
    db.connect(function (err) {
      if (err) throw err;
    });

    var query = db.query('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES (?, ?, ?, ?, ?)', [req.body.name, req.body.base_price, req.body.base_price, req.body.start_date, req.body.end_date], function (error, results, fields) {
      if (error) throw error;

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
    });

    db.query('SELECT *  FROM ( SELECT auctions.*, bids.amount, bids.id AS bids_id FROM auctions INNER JOIN bids ON auctions.id = bids.auction_id WHERE auctions.id = ? ) AS test ORDER BY amount DESC LIMIT 1;', [req.params.id], function (error, results, fields) {
      if (error) throw error;
      res.send(results[0]);
    });
  } catch (err) {
    //
  }
});

module.exports = router;
