var express = require('express');
var router = express.Router();

var cors = require('cors')

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
        });

        db.query('SELECT * FROM bids', function (error, results, fields) {
            if (error) throw error;

            res.send(results);
        });

    } catch (err) {
        res.sendStatus(500);
    }

});

router.get('/:id', cors(), function (req, res, next) {
    try {
        db.connect(function (err) {
            if (err) throw err;
        });

        db.query('SELECT * FROM bids WHERE bids.id = ?', [req.params.id], function (error, results, fields) {
            if (error) throw error;

            res.send(results[0]);
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/', cors(), function (req, res, next) {
    try {
        db.connect(function (err) {
            if (err) throw err;
        });

        db.query('INSERT INTO bids (auction_id, user_id, date, amount) VALUES (?, ?, ?, ?)', [req.body.auction_id, req.body.user_id, req.body.date, req.body.amount], function (error, results, fields) {
            if (error) throw error;
        });

        db.query('UPDATE auctions SET current_price = ? WHERE id = ?', [req.body.amount, req.body.auction_id], function (error, results, fields) {
            if (error) throw error;

            res.send(results);

        });

    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;
