var mongoose = require('mongoose');
 


module.exports.verificarLogin = function(login, senha){
	mongoose.connect('mongodb://localhost:27017/PortalDaMusicaDB');
	var usuario = require("../model/usuarioModel");
	console.log("OPA LOGIN");
	console.log(usuario.findOne({
		"login": login,
		"senha": senha
	}));
}


// module.exports.verificarLogin = function(application, res, data) { 

//     var connection = application.config.db_connection();

//     connection.query("select * from user where login = '" + data.login + "' and senha = '" + data.senha + "'", function (error, result) {
//         console.log(result);
//         if(result.length > 0) {
//             res.render('index', {validacao : result});
//         } else {
//             application.app.model.indexModel.showIndex(null, res);
//         }
//     });
// }