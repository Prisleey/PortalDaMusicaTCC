

module.exports.login = function(application, req, res) {
    
    var dadosFormLogin = req.body;

    req.assert('login', 'Login é obrigatório.').notEmpty();
    req.assert('senha', 'Senha é obrigatório.').notEmpty();

    var errors = req.validationErrors();

    if(!errors) {
        // var connection = application.config.db_connection;
        // console.log(connection());
        // var usuarioDAO = new application.app.model.usuarioDAO(connection);

        // console.log(connection);
        // usuarioDAO.login(dadosFormLogin);
        application.app.model.loginModel.verificarLogin(application, res, dadosFormLogin);
        return;
    } else {
        //res.send('Existem erros no formulário');
        res.render('index', { validacao : errors });
        return;
    }
}

module.exports.cadastro = function(application, req, res) {
    var User = require('../model/usuarioModel');
    extend = require('mongoose-schema-extend');

    var userName = req.body.nome;
    var userLogin = req.body.login;
    var userEmail = req.body.email;
    var userPwd = req.body.senha;

    console.log('senha '+ userPwd );
    console.log('login '+ userLogin);
    console.log('email '+ userEmail);
    console.log('name ' + userName);

    var newUser = new User();
    newUser.nome = userName;
    newUser.senha = userPwd;
    newUser.login = userLogin;
    newUser.email = userEmail;
    console.log('####################################VAMO PO SEIVE######################################');
    console.log(newUser);
    newUser.save(function(err, newUser,) {
        console.log('*********************************************************save***************************************************');
        if(err) {
            console.log(err);
            console.log('aqui');
            return res.status(500).send();
        }
        console.log('fora do if 200');
        return res.status(200).send();
    });
}