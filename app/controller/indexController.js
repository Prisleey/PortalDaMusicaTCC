module.exports.index = function(application, req, res) {
    application.app.model.indexModel.showIndex(req, res);
}