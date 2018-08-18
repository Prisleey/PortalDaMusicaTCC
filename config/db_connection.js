var mysql = require('mysql');

var connMysql = function() {
    return mysql.createConnection({
        host : 'localhost',
        user : 'prisley',
        password : 'rootpris',
        database : 'estudiomusica'
    });
}

module.exports = function() {
    return connMysql;
}