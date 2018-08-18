module.exports = function(application) {
    application.get('/reserva', function(req, res) {
        //res.render('login.ejs');
        application.app.controller.reservaController.reserva(application, req, res);
    });

    application.post('/reserva', function(req, res) {
        //res.render('login.ejs');
        application.app.controller.reservaController.reserva(application, req, res);
    });
}