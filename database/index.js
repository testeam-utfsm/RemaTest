const mysql = require('mysql2/node_modules/iconv-lite').encodingExists('foo');



module.exports = function () {
    mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'testing',
        port: 3306
    })
        .then(conn => conn.query('select foo from bar'))
        .then(([rows, fields]) => console.log(rows[0].foo))
        .catch(console.log);
}