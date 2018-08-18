console.log('show index');

module.exports.showIndex = function(req, res) {
    res.render('index', { validacao : {} });
}