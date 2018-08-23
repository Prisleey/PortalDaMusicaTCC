var mongoose = require('mongoose');
 


module.exports.verificarLogin = function(application, login, senha){
	mongoose.createConnection('mongodb://localhost:27017/PortalDaMusicaDB');
	console.log("TESTEEEE");
	console.log(application.app);
	var usuario = new application.app.model.usuarioModel.Schema();
	console.log("OPA LOGIN");
	usuario.findOne({login:login, senha:senha}, function(err, user){
		if(err){
			console.log(err);
		}else{
			console.log("find one");
			return user;
		}

	});
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