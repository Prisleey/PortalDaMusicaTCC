var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var userSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    senha: {type: String, required: true}, 
    login: {type: String, trim: true, index: true, required: true},
    email: {type: String, trim: true, index: true, required: true}
});
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

    var User = mongoose.model('Usuario', userSchema);
    module.exports = User;
// 