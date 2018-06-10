'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');
const repository = require('../repositories/cliente-repository');

exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({message: 'Cliente cadastrado com sucesso'});     
    } catch(err) {
        res.status(400).send({message: 'Falha ao cadastrar o cliente', data: err});
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
    try{
        await repository.update(req.params.id, req.body.pessoa);
        res.status(200).send({ message: 'Cliente atualizado com sucesso'});
    } catch(err) {
        res.status(400).send({ message: 'Falha ao atualizar produto'}, e);
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