// importar o mongodb
var mongodb = require('mongodb');

var connMongoDB = function() {
    console.log('conexão');
    var db = new mongodb.Db(
        'PortalDaMusicaDB', 
        new mongodb.Server(
            'localhost', //string endereço servidor bd
            27017, //porta de conexao
            {} //objeto de configuração adicionais do servidor, nesse caso vazio
        ),
        {} //objeto de configuração adicionais do servidor, nesse caso vazio
    );
    return db;
}

module.exports = function() {

    return connMongoDB;
}