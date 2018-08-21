let express = require('express');
let router = express.Router();
let userBusiness = require('../business/User/user');
let contratoBusiness = require('../business/Contrato/contrato');
let assinaturaBusiness = require('../business/Assinatura/assinatura');
let utils = require('../business/Utils/utils');
let jwt = require('jsonwebtoken');
let config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test',function(req,res,next){
  res.end(JSON.stringify({ "status": true,message:"message from rest api" }));
});

router.post('/login',function(req,res){
  userBusiness.login(req.body.email,req.body.senha).then(function(response){
    res.o
    res.end(JSON.stringify(response));
  }).catch(function(err){
    res.end(JSON.stringify(err));
  });
});

router.post('/FileUpload',function(req,res){
  utils.salvarDocumento("USER_ID",req.body.content).then(function(response){
    res.end(JSON.stringify(response));
  }).catch(function(err){
    res.end(JSON.stringify(err));
  });
})

router.get('/getUserInfo',function(req,res){
  let token = req.body.token || req.query.token || req.headers['authorization'] || req.headers['Authorization'];
  jwt.verify(token, config.JWT_KEY, function (err, decoded) {
    if (err) {
      return res.status(403).send({
        status: false,
        message: 'Token inválido'
      });
    } else {
      res.end(JSON.stringify(decoded));
    }
  });
});

router.post('/ValidateEmail',function(req,res){
  utils.validateEmail(req.body.email).then(function(response){
    res.end(JSON.stringify(response));
  }).catch(function(err){
    res.end(JSON.stringify(err));
  })
});

router.post('/ValidateCpf',function(req,res){
  utils.validateCpf(req.body.cpf).then(function(response){
    res.end(JSON.stringify(response));
  }).catch(function(err){
    res.end(JSON.stringify(err));
  })
});

router.get('/Dashboard',function(req,res) {
  let date = new Date();
  contratoBusiness.todosFechamentoMesAno(date.getMonth()+1,date.getFullYear()).then(function(confirmacoes) {
    assinaturaBusiness.getPagamentosMesAno(date.getMonth()+1,date.getFullYear()).then(function(pagamentos) {
      let regularizados = [];
      let pendentesRegularizacao = [];
      let pendentesConfirmacao = [];
      let retorno = {
        'regularizados' : regularizados,
        'pendentesRegularizacao' : pendentesRegularizacao,
        'pendentesConfirmacao' : pendentesConfirmacao,
        'pagamentos' : pagamentos
      };

      confirmacoes.forEach(function(c) {
        if(c.status == true && c.fechado == true){
          regularizados.push(c);
        }else if(c.status == true && c.fechado == false){
          pendentesRegularizacao.push(c);
        }else {
          pendentesConfirmacao.push(c);
        }
      });
      res.end(JSON.stringify(retorno));
    }).catch(function(err) {
      res.end(JSON.stringify({stauts:false,"erro pagamentos":err}));
    });
  }).catch(function(err) {
    res.end(JSON.stringify({stauts:false,"erro contrato":err}));
  });
});


module.exports = router;
