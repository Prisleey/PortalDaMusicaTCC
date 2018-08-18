// importar o mongodb
var mongodb = require('mongodb').MongoClient;

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


// var connMongoDB = function(dados) {
//     mongo.connect(url, function(err, client) {
//         assert.equal(null, err);
//         console.log("Connected successfully to server");
//         const db = client.db(dbName);
//         query(db, dados);
//         client.close();
//     });
// };
// function query(db, dados) {
//     var collection = db.collection(dados.collection);
//     switch (dados.operacao) {
//         case "inserir":
//         collection.insertOne(dados.usuario, dados.callback);
//         break;
//         default:
//         break;
//     }
// }