const authService = require('./../services/auth-service');
const repository = require('../repositories/authenticate-repository');

exports.authenticate = async(req, res, next) => {
    try {
        const cliente = await repository.authenticate({
            usuario: req.body.usuario,
            senha: req.body.senha
        });

        if(!cliente){
            res.status(404).send( {message: 'Usuario ou senha inválidos'});    
            return;
        }

        const token = await authService.generateToken({
            usuario: cliente.usuario, 
            nome: cliente.pessoa.nome
        });

        res.status(200).send({
            token: token,
            data: cliente._id
        });     
    } catch(err) {
        console.log(err);
        res.status(500).send({message: 'Houve um problema na requisição'});
    }    
};