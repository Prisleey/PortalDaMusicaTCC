module.exports.login = function(application, req, res) {
    console.log("Chegou na login controller");
    var dadosFormLogin = req.body;



    // var connection = application.config.db_connection;
    // console.log(connection());
    // var usuarioDAO = new application.app.model.usuarioDAO(connection);

    // console.log(connection);
    // usuarioDAO.login(dadosFormLogin);
    var userLogin = req.body.login;
    var userSenha = req.body.senha;

    console.log(userLogin);
    console.log(userSenha);
    console.log(application.app);
    var usuarioLoggado = application.app.model.loginModel.verificarLogin(application, userLogin, userSenha);
    console.log("OPA VORTOU");
}