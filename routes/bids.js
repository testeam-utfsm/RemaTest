var express = require('express');
var router = express.Router();

var cors = require('cors')

const mysql = require('mysql2/promise');
// const db = mysql.createConnection({
//     host: 'rematest-db',
//     user: 'root',
//     password: 'root',
//     database: 'testing',
//     port: 3306
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
        const db = await conn()
        
        let r = await db.query('SELECT * FROM bids');

        if (r.error) {
            throw new Error(r.error);
        }

        res.send(r.results);

    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }

});

router.get('/:id', cors(), async function (req, res, next) {
    try {
        const db = await conn()
        console.log(req.params.id)
        let r = await db.query('SELECT * FROM bids WHERE id = ?', [1]);

        if (r[0].length != undefined) {
            res.send(r[0][0]);
        } else {
            res.sendStatus(404);
            // throw(new Error(r.error))
        }

    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

router.post('/', cors(), async function (req, res, next) {
    try {
        const db = await conn()

        let r = await db.query('INSERT INTO bids (auction_id, user_id, date, amount) VALUES (?, ?, ?, ?)', [
            req.body.auction_id, req.body.user_id, req.body.date, req.body.amount
        ]);

        if (r.error) {
            throw new Error(r.error);
        }

        r = await db.query('UPDATE auctions SET current_price = ? WHERE id = ?', [
            req.body.amount, req.body.auction_id
        ]);

        if (r.error) {
            throw new Error(r.error);
        }

        res.sendStatus(200);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

module.exports = router;
