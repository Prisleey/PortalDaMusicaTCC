module.exports = function(application) {
    application.get('/', function(req, res) {
        application.app.controller.indexController.index(application, req, res);
        // res.render('index');
    });

    application.post('/', function(req, res) {
        application.app.controller.indexController.index(application, req, res);
    });
}