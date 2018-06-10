'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');
const repository = require('../repositories/cliente-repository');
const ValidatorContract = require('../validators/fluent-validator');


exports.post = async(req, res, next) => {

    let contract = new ValidatorContract();

    contract.hasMinLen(req.body.senha, 6, 'A senha deve ter pelo menos 6 caracteres');
    contract.hasMinLen(req.body.pessoa.nome, 2, 'O nome deve ter pelo menos 2 caracteres');
    contract.hasMinLen(req.body.pessoa.sobrenome, 2, 'O sobrenome deve ter pelo menos 2 caracteres');
    contract.isFixedLen(req.body.pessoa.cpf, 11, 'O cpf deve ser válido');
    contract.hasMinLen(req.body.pessoa.telefone, 8, 'O telefone deve ter pelo menos 8 caracteres');
    contract.isRequired(req.body.pessoa.sexo, 'Deve conter o sexo do cliente');
    contract.isEmail(req.body.pessoa.email, 'O email deve ser válido');
    contract.isRequired(req.body.pessoa.dataNasc, 'Deve conter data de nascimeneto');
    
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    };

    req.body.usuario = req.body.pessoa.email;

    try {
        await repository.create(req.body);
        res.status(201).send({message: 'Cliente cadastrado com sucesso'});     
    } catch(err) {
        res.status(500).send({message: 'Houve um problema na requisição'});
    }    
};

exports.get = async(req, res, next) => {
    try {
        let body = await repository.get();
        res.status(200).send(body);    
    } catch(err) {
        res.status(500).send(err);
    }
};

exports.getById = async(req, res, next) => {
    try{
        let body = await repository.getById(req.params.id);
        res.status(200).send(body);
    } catch(err) {
        res.status(404).send(err);
    }
};

exports.put = async(req, res, next) => {
    
    let contract = new ValidatorContract();

    contract.hasMinLen(req.body.senha, 6, 'A senha deve ter pelo menos 6 caracteres');
    contract.hasMinLen(req.body.pessoa.nome, 2, 'O nome deve ter pelo menos 2 caracteres');
    contract.hasMinLen(req.body.pessoa.sobrenome, 2, 'O sobrenome deve ter pelo menos 2 caracteres');
    contract.isFixedLen(req.body.pessoa.cpf, 11, 'O cpf deve ser válido');
    contract.hasMinLen(req.body.pessoa.telefone, 8, 'O telefone deve ter pelo menos 8 caracteres');
    contract.isRequired(req.body.pessoa.sexo, 'Deve conter o sexo do cliente');
    contract.isEmail(req.body.pessoa.email, 'O email deve ser válido');
    contract.isRequired(req.body.pessoa.dataNasc, 'Deve conter data de nascimeneto');
    
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    };
    
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Cliente atualizado com sucesso'});
    } catch(err) {
        res.status(500).send({ message: 'Houve um problema na requisição'}, err);
    }
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.id);
        res.status(200).send( { message: 'Cliente removido com sucesso'});
    } catch(err) {
        res.status(400).send({message : 'Falha ao remover cliente',  data: err});
    }
};