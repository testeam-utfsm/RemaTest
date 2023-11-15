var express = require('express');
var router = express.Router();

var cors = require('cors');
var app = express();

const mysql = require('mysql2/promise');
// const db = mysql.createConnection({
//   host: 'rematest-db',
//   user: 'root',
//   password: 'root',
//   database: 'testing',
//   port: 3306
// });


let conn = async function () {
  return mysql.createConnection({
    host: 'rematest-db',
    user: 'root',
    password: 'root',
    database: 'testing',
    port: 3306
  })
};


router.get('/', cors(), async function (req, res, next) {
  try {
    const db = await conn();

    let [rows, _] = await db.query('SELECT * FROM auctions');

    if (rows == undefined){
      throw new Error('No auctions found');
    }

    res.send(rows);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete('/:id', cors(), async function (req, res, next) {
  try {
    const db = await conn();

    let [rows, _] = await db.query('SELECT * FROM auctions WHERE id = ?', [req.params.id]);
    let now = new Date();
    let end_date = new Date(rows[0].end_date);
    let diff = now - end_date;
    let minutes = Math.floor(diff / 1000 / 60);

    if (minutes > 60) {
      throw new Error('Auction is older than 1 hour');
    }

    [rows, _] = await db.query('SELECT * FROM bids WHERE auction_id = ?', [req.params.id]);

    if (rows.length > 0) {
       res.send('Auction has bids');
    } 

    await db.query('DELETE FROM auctions WHERE id = ?', [req.params.id]);

    res.send('OK');
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:id', cors(), async function (req, res, next) {
  try {
    const db = await conn();

    let [rows, _] = db.query('SELECT * FROM auctions WHERE id = ?', [req.params.id]);
    let now = new Date();
    let end_date = new Date(rows[0].end_date);
    let diff = now - end_date;
    let minutes = Math.floor(diff / 1000 / 60);

    if (minutes > 60) {
      throw new Error('Auction is older than 1 hour');
    }

    [rows, _] = await db.query('SELECT * FROM bids WHERE auction_id = ?', [req.params.id]);

    if (rows.length > 0) {
      throw new Error('Auction has bids');
    } 

    await db.query('UPDATE auctions SET name = ?, base_price = ? WHERE id = ?', [req.body.name, req.body.base_price, req.params.id]);

    res.send('OK');
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post('/', cors(), async function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // req.header("Access-Control-Allow-Origin", "*");

  try {
    const db = await conn()

    let r = await db.query('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES (?, ?, ?, ?, ?)', [
      req.body.name, req.body.base_price, req.body.base_price, req.body.start_date, req.body.end_date
    ]);
    if(r.error){
      throw new Error(r.error);
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message)
    res.status(500).send(err);
  }
});

router.get('/:id', cors(), async function (req, res, next) {
  try {

    const db = await conn()

    let [rows, _] = await db.query('SELECT *  FROM ( SELECT auctions.*, bids.amount, bids.id AS bids_id FROM auctions INNER JOIN bids ON auctions.id = bids.auction_id WHERE auctions.id = ? ) AS test ORDER BY amount DESC LIMIT 1;', [req.params.id]);

    if (rows == undefined){
      throw new Error('No auctions found');
    }

    res.send(rows[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
