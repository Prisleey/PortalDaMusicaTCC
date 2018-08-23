module.exports.cadastro = function(application, req, res) {
    //var User = require('../model/usuarioModel');

    var userName = req.body.nome;
    var userLogin = req.body.login;
    var userEmail = req.body.email;
    var userPwd = req.body.senha;

    console.log('senha '+ userPwd );
    console.log('login '+ userLogin);
    console.log('email '+ userEmail);
    console.log('name ' + userName);

    var newUser = new application.app.model.usuarioModel.Schema();
    newUser.nome = userName;
    newUser.senha = userPwd;
    newUser.login = userLogin;
    newUser.email = userEmail;
    console.log('####################################VAMO PO SEIVE######################################');
    console.log(newUser);
    newUser.save(function(err, newUser) {
        console.log('*********************************************************save***************************************************');
        if(err) {
            console.log(err);
            console.log('aqui');
            return res.status(500).send();
        }
        res.render('index', { validacao : {} });
    });
    
}