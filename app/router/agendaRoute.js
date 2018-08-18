module.exports = function(application) {
    application.get('/agenda', function(req, res) {
        application.app.controller.agendaController.listarAgenda(application, req, res);
    });
}