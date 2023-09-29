const mysql = require('mysql2');

const db = mysql.createConnection({
    host    : '127.0.0.1',
    user    : 'root',
    password: 'root',
    database: 'testing',
    port    : 3306
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db