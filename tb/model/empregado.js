var mongoose = require('mongoose'),
extend = require('mongoose-schema-extend'),
Schema = mongoose.Schema,
UserSchema = require('./user');
var options = {discriminatorKey: 'kind'};

var dependenteSchema = new Schema({
    nome : { type: String, required: true },
    cpf : { type: String, required: true },
    dataNasc : { type: String, required: true },
    deducaoIRRF : { type: Boolean, default: false },
    certidaoImg : {type: String },
    salarioFamilia : { type: Boolean, default: false }
});

var documentoSchema = new Schema({
    nome: { type: String },
    filePath : { type: String },
    dataEnvio : { type: Date, default: Date.now },
    tipo : { type: String },
    isContador: { type: Boolean, default: false},
});


var empregadoSchema = UserSchema.discriminator('Empregado',
    new Schema({
    tituloEleitor : { type: String },
    paisNascimento : { type : String },
    nis : { type: String  },
    status : { type: String, default : "Ativo" },
    salario : { type: String },
    login: { type: String },
    codigo: { type : String },
    dependentes : {
        type: [dependenteSchema],
        select : true
    },
    documentos: {
        type : [documentoSchema],
        select: false
    },
}, options));

var Empregado = mongoose.model('Empregado');

// make this available to our users in our Node applications
module.exports = Empregado;