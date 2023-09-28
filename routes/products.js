var express = require('express');
var router = express.Router();

var cors = require('cors')
var app = express()

router.get('/', cors(), function (req, res, next) {
  res.send(['products'])
});

module.exports = router;
