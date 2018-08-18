module.exports = function(application) {
    application.get('/cadastro-estudio', function(req, res) {
        application.app.controller.cadastroEstudioController.showCadastroEstudio(application, req, res);
    });

    application.post('/cadastro-estudio', function(req, res) {
        application.app.controller.cadastroEstudioController.postCadastroEstudio(application, req, res);
    });
}