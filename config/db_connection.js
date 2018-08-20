// importar o mongoose
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PortalDaMusicaDB');

module.exports = function() {
    return mongoose;
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