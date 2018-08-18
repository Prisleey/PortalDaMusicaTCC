function usuarioDAO(connection) {
    this._connection = connection();
}

usuarioDAO.prototype.login = function(dadosLogin) {
    // console.log(dadosLogin);
    // this._connection.open( function(error, mongoClient) {
    //     console.log(mongoClient);
    // });
}

module.exports = function() {
    return usuarioDAO;
}