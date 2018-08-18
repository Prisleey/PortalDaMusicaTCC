/*importar configurações do servidor */

var app = require('./config/app');

//parametrizar a porta de escuta

app.listen(80, function() {
    console.log('servidor online...');
});