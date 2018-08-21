let Contador = require('../../models/contador');
let User = require('../../models/user');
let Empregado = require('../../models/empregado');
let contratoBusiness = require('../../business/Contrato/contrato');
let config = require('../../config.json');
let jwt = require('jsonwebtoken');


exports.login = function(email,senha){
    return new Promise(function(resolve,reject){
        Empregado.findOne({
            "login":email,
            "codigo":senha
        },function(e,emp){
            if(emp != null){
                contratoBusiness.buscarPorEmpregado(emp._id).then(function(contratos){
                    if(contratos){
                        let token = jwt.sign(JSON.parse(JSON.stringify(emp)), config.JWT_KEY);
                        resolve({"status" : true,"userId":emp._id, "token" : token, "kind": "Empregado", "contrato":contratos[0]});
                    }else {
                        let token = jwt.sign(JSON.parse(JSON.stringify(emp)), config.JWT_KEY);
                        resolve({"status" : true, "userId":emp._id, "token" : token, "kind": "Empregado"});    
                    }
                }).catch(function(err){
                    let token = jwt.sign(JSON.parse(JSON.stringify(emp)), config.JWT_KEY);
                    resolve({"status" : true, "userId":emp._id, "token" : token, "kind": "Empregado"});
                });
                
            }else {
                User.findOne({
                    "email" : email
                },function(err,contador){
                    if(err || contador == null){
                        reject({"status": false, "message": "Erro tentando logar, tente novamente mais tarde", "error" : err});
                    } else {
                        contador.comparePassword(senha, function (err, isMatch) {
                            if (err || !isMatch) {
                                reject({
                                    "status": false,
                                    "message": "Senha inválida"
                                });
        
                            }else {
                                let token = jwt.sign(JSON.parse(JSON.stringify(contador)), config.JWT_KEY);
                                resolve({"status" : true,"userId":contador._id, "token" : token, "kind": contador.kind});
                            }
                        });
                    }
                })
            }
        })
    });
}