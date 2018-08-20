    // importar o mongoose
var mongoose = require('mongoose');

var connMongoose = function() {
    return mongoose.connect('mongodb://localhost:27017/PortalDaMusicaDB');
}

module.exports = function() {
    return connMongoose;
}