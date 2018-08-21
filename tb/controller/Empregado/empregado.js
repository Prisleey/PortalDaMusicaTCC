let Empregado = require('../../models/empregado');
let Endereco = require('../../models/address');
let contratoBusiness = require('../../business/Contrato/contrato');
let confirmacaoBusiness = require('../../business/Confirmacao/confirmacao');
let Ponto = require('../../models/ponto');
var uid = require('rand-token').uid;
let utils = require('../Utils/utils');
let ObjectId = require('mongoose').Types.ObjectId; 

exports.novoEmpregado = function(data) {
    return new Promise(function(resolve,reject){
        let empregado = new Empregado(data);
        empregado._id = ObjectId()
        if(empregado.dependentes != null){
            let limit = empregado.dependentes.length;
            let p = 0;
            if(limit > 0){
                empregado.dependentes.forEach(function(d,i) {
                    if(d.certidaoImg != null){
                        utils.salvarDocumento(uid(5), d.certidaoImg).then(function(doc){
                            d.certidaoImg = doc.url;
                            p = p + 1;
                            if(p == limit){
                                empregado.save(function(err){
                                    if(err) {
                                        reject({"status":false,"message":"Erro ao salvar o empregado, tente novamente", "error":err});
                                    }else {
                                        resolve({"status":true,"empregado":empregado})
                                    }
                                });
                            }
                        }).catch(function(err){
                            reject({status : false});
                        });
                    }
                });
            }else {
                empregado.save(function(err){
                    if(err) {
                        reject({"status":false,"message":"Erro ao salvar o empregado, tente novamente", "error":err});
                    }else {
                        resolve({"status":true,"empregado":empregado})
                    }
                });     
            }
            
        }else {
            empregado.save(function(err){
                if(err) {
                    reject({"status":false,"message":"Erro ao salvar o empregado, tente novamente", "error":err});
                }else {
                    resolve({"status":true,"empregado":empregado})
                }
            });
        }

    });
}

exports.editarEmpregado = function(data,empregadoID) {
    return new Promise(function(resolve,reject){
        if(data.senha != undefined){
            delete data.senha
        }
        if(data.dependentes != null){
            let limit = data.dependentes.length;
            let p = 0;
            if(limit > 0){
                data.dependentes.forEach(function(d,i) {
                    if(d.certidaoImg != null){
                        utils.salvarDocumento(uid(5), d.certidaoImg).then(function(doc){
                            d.certidaoImg = doc.url;
                            
                            p = p + 1;
                            if(p == limit){
                                console.log('show',data);
                                Empregado.where({
                                    "_id":ObjectId(empregadoID)
                                }).update({
                                    $set : data
                                },function(err,updates){
                                    if(err){
                                        reject({"status":false,"message":"Erro ao salvar o empregado, tente novamente", "error":err});
                                    }else {
                                        resolve({"statuss":true,'u':updates});
                                    }
                                });
                            }
                        }).catch(function(err){
                            reject({status : false});
                        });
                    }
                });
            }else {
                Empregado.where({
                    _id: (empregadoID)
                }).update({
                    $set : data
                },function(err,updates){
                    if(err){
                        reject({"status":false,"message":"Erro ao salvar o empregado, tente novamente", "error":err});
                    }else {
                        resolve({"status":true,'u':updates});
                    }
                });
            }
        
        }else {
            Empregado.where({
                _id: (empregadoID)
            }).update({
                $set : data
            },function(err,updates){
                if(err){
                    reject({"status":false,"message":"Erro ao salvar o empregado, tente novamente", "error":err});
                }else {
                    resolve({"status":true,'u':updates});
                }
            });
        }
        
    });
}

exports.listarEmpregados = function(){
    return new Promise(function(resolve,reject){
        Empregado.find({},function(err,empregados){
            if(err){
                reject({"status":false,"message":"Erro ao salvar o empregado, tente novamente", "error":err});
            }else {
                resolve(empregados);
            }
        });
    });
}

exports.buscarEmpregadoPorId = function(empregadoID){
    return new Promise(function(resolve,reject){
        Empregado.findOne({
            "_id": empregadoID
        },function(err,empregados){
            if(err){
                reject({"status":false,"message":"Erro ao salvar o empregado, tente novamente", "error":err});
            }else {
                resolve(empregados);
            }
        });
    });
}

exports.salvarDocumento = function(data,user){
    return new Promise(function(resolve,reject){

        Empregado.where({
            "_id": data.empregadoID
        }).update({
            $push: {
                documentos: data.documentos
            }
        }, function (err, announcerUpdated) {
            if (err) {
                resolve(JSON.stringify(err));
            } else {
                resolve({
                    "status": true,
                    "message": "Documento savo com sucesso!"
                });
            }
        });
    });
}

exports.gerarLogin = function(empregadoID){
    return new Promise(function(resolve,reject){
        Empregado.findOne({
            "_id": empregadoID
        },function(error,empregado){
            empregado.login = uid(5);
            let senha = uid(5);
            empregado.codigo = senha;
            empregado.save(function(err){
                if(err){
                    reject({"status":false,"message":"Erro ao gerar acesso o empregado, tente novamente", "error":err});
                }else {
                    resolve(empregado);
                }
            });
        });
    });
}

exports.registrarPonto = function(data) {
    return new Promise(function(resolve,reject){
        let p = new Ponto(data);
        p._id = ObjectId()
        p.save(function(err){
            if(err){
                reject({"status":false,"message":"Erro ao registrar o ponto, tente novamente", "error":err});
            }else {
                resolve({"status":true,"ponto" : p});
            }
        });
    });
}

exports.editarPonto = function(pontoID,data,user) {
    return new Promise(function(resolve,reject){
        if(data.justificativa != undefined){
            utils.salvarDocumento(uid(5), data.justificativa).then(function(doc){
                data.justificativa = doc.url;
                data.isContador = true;
                Ponto.where({_id : pontoID}).update(
                    {$set : data }
                ,function(err,rows){
                    if (!err) {
                        resolve({status: true, justificativa : doc.url});
                    }else {
                        reject({status: false});
                    }
                }); 
            }).catch(function(err){
                reject({status : false});
            });
        }else {
            
            Ponto.where({_id : pontoID}).update(
                {$set : data }
            ,function(err,rows){
                console.log('sadsadsd');
                if (rows.nModified == 0) {
                    reject({status : false});
                }else {
                    resolve({status: true});
                }
            });
        }
    });
}

exports.deletarEmpregado = function(empregadoID) {
    return new Promise(function(resolve,reject) {
        
        contratoBusiness.buscarPorEmpregado(empregadoID).then(function(contrato) {
            if(contrato){
                contrato = contrato[0];
                confirmacaoBusiness.exluirConfirmacoesPorContrato(contrato._id)
                contratoBusiness.excluirContrato(contrato._id)
            }
            Empregado.remove({
                _id : empregadoID
            }, function(err) {
                if(err){
                    resolve({status : false});
                }else {
                    resolve({status : true});
                }
            });
        }).catch(function(err) {
            console.log(err);
        });
    });
}