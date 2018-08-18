module.exports = function(application) {
    application.get('/cadastro-sala', function(req, res) {
        application.app.controller.cadastroSalaController.showCadastroEstudio(application, req, res);
    });

    application.post('/cadastro-sala', function(req, res) {
        application.app.controller.cadastroSalaController.postCadastroSala(application, req, res);
    });
}