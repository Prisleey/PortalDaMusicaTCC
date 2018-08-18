module.exports = function(application) {
    application.get('/detalhe-estudio', function(req, res) {
        application.app.controller.detalheEstudioController.detalheEstudio(application, req, res);
    });
}