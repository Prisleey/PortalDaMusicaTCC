var mongoose = require('mongoose'),
extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;
var options = {discriminatorKey: 'kind'};

// create a schema
var userSchema = new Schema({    
    // email: { type: String, unique: true},
    email : {type: String, trim: true, index: true, unique: true, sparse: true},
    senha : { type: String },
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    online: { type: Boolean },
    dataNasc: { type: Date, required: true },
    cpf: { type: String, required: true },
    cpfImg: { type: String },
    tituloEleitorImg: { type: String },
    telefoneFixo : { type : String },
    telefoneCelular : { type : String },
    endereco : {
        rua: { type: String },
        cep : { type : String },
        cidade: { type : String },
        bairro: { type : String },
        estado: { type : String },
        complemento: { type : String },
        numero: { type : String }
    },
},
    options
);


userSchema.post('update', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        let campo = String(error.message);//'E11000 duplicate key error collection: PortalDomesticos.users index: email_1 dup key: { : "tobias3@email.com" }';
        campo = String(campo.split('index: ')[1]);
        campo = String(campo.split(' dup key')[0])
        campo = String(campo.substring(0, campo.lastIndexOf('_'))) // returns email
        next(("Atenção! campo: "+campo+' já cadastrado!'));
      } else {
        next(error);
      }
});

userSchema.post('save', function(error, doc, next) {
    
    if (error.name === 'MongoError' && error.code === 11000) {
        let campo = String(error.message);//'E11000 duplicate key error collection: PortalDomesticos.users index: email_1 dup key: { : "tobias3@email.com" }';
        campo = String(campo.split('index: ')[1]);
        campo = String(campo.split(' dup key')[0])
        campo = String(campo.substring(0, campo.lastIndexOf('_'))) // returns email
        next(("Atenção! campo: "+campo+' já cadastrado!'));
      } else {
        next(error);
      }
});

userSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('senha')){
    return next();
  }


  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err){
        return next(err);
    } 
      // hash the password using our new salt
      bcrypt.hash(user.senha, salt, function(err, hash) {
         if (err){
             return next(err);
         } 
          // override the cleartext password with the hashed one
          user.senha = hash;
          
          next();
      });
  });
});

userSchema.methods.generateHash = function(senha) {
    return bcrypt.hashSync(senha, SALT_WORK_FACTOR)
}

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    console.log(this.senha);
    console.log(candidatePassword);
  bcrypt.compare(candidatePassword, this.senha, function(err, isMatch) {
      console.log(err,isMatch);
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;