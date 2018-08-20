module.exports = function(application) {
    application.get('/login', function(req, res) {
        application.app.controller.loginController.login(application, req, res);
    });

    application.post('/cadastro', function(req, res) {
        application.app.controller.userController.cadastro(application, req, res);
    });
}