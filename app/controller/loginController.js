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