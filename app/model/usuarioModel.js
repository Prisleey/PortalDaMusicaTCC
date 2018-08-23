module.exports.Schema = function() {
    console.log("entrou em schema");
    var mongoose = require('mongoose');
    mongoose.createConnection('mongodb://localhost:27017/PortalDaMusicaDB'); 
    var Schema = mongoose.Schema;
        
    mongoose.Promise = global.Promise;
    console.log("PROMETEU");
    var userSchema = new Schema({
        nome: {type: String, required: true},
        senha: {type: String, required: true}, 
        login: {type: String, trim: true, index: true, required: true},
        email: {type: String, trim: true, index: true, required: true}
    }, { collection: 'Usuario' });
    console.log("********* TESTE *****************");
    // userSchema.post('save', function(error, doc, next) {
    //     next(error);
    // });

    // userSchema.pre('save', function() {
    //     var user = this;
    //     if(!user.isModified('senha')) {
    //         return next();
    //     }
    // });

    console.log("VAI RETORNAR");
    return mongoose.model('Usuario', userSchema);
}