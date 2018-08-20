

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
    console.log('aqui');
    var User = require('../model/usuarioModel');

    var userName = req.body.nome;
    var userLogin = req.body.login;
    var userEmail = req.body.email;
    var userPwd = req.body.pwd;

    var novoUsuario = User();
    novoUsuario.nome = userName;
    novoUsuario.senha = userPwd;
    novoUsuario.login = userLogin;
    novoUsuario.email = userEmail;

    novoUsuario.save(function(err, boa) {
        if(err) {
            console.log(err);
        } else {
            console.log(boa);
        }
    });
}