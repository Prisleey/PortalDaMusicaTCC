//importar modulo do framework express
var express = require('express');

//importar modulo mongoose
var mongoose = require('mongoose');
console.log(mongoose.Schema);

//importar modulo do consign
var consign = require('consign');

//importar body-parser
var bodyParser = require('body-parser');

//importar express-validator
var expressValidator = require('express-validator');

//iniciar objeto do express
var app = express();

//setar variaveis view.engine e views do express
app.set('view engine', 'ejs');
app.set('views', './app/view'); //diretório das views

//middleware express.static
app.use(express.static('./app/public'));

//middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

//middleware express-validator
app.use(expressValidator());

//autoload
consign()
	.include('/app/router/')
	.then('config/db_connection.js') // referencio o db_connection para não entrar em loop infinito chamando o server.js toda hora
	.then('app/controller/')
	.then('app/model/')
	.into(app); //consign reconhece todas as rotas e inclui dentro do servidor

//exportar o objeto app
module.exports = app;