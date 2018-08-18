module.exports = function(application) {
    application.get('/listar-estudios', function(req, res) {
        application.app.controller.listarEstudioController.listarEstudios(application, req, res);
    });
}