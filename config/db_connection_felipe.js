var mysql = require('mysql');

var connMysql = function() {
    return mysql.createConnection({
        host : 'localhost',
        user : 'felipe_root',
        password : 'root',
        database : 'estudiomusica'
    });
}

module.exports = function() {
    return connMysql;
}