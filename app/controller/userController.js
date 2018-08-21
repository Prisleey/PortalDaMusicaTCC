

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
    newUser.save(function(err, savedUser){
        if(err) {
            console.log(err);
            console.log('aqui');
            console.log(savedUser);
            return res.status(500).send();
        }
        console.log('fora do if 200');
        return res.status(200).send();
    });



}