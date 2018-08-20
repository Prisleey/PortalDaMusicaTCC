    var mongoose = require('mongoose');
    
    var userSchema = new mongoose.Schema({
        nome: String,
        senha: String, 
        login: String,
        email: String
    });

    var User = mongoose.model('Usuario', userSchema);
    module.exports = User;
