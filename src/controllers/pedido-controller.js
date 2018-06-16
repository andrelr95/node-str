'use strict';

const mongoose = require('mongoose');
const repository = require('../repositories/pedido-repository');

exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({message: 'Pedido criado com sucesso'});     
    } catch(err) {
        console.log(err)
        res.status(400).send({message: 'Falha realizar o pedido', data: err});
    }    
};

exports.getByStatus = async(req, res, next) => {
    try{
        let body = await repository.getByStatus(req.query.status);
        res.status(200).send(body);
    }catch(err){
        res.status(500).send({message: 'Houve um erro na requisição'});
    }
}

exports.get = async(req, res, next) => {
    try {
        let body = await repository.get();
        res.status(200).send(body);    
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.getById = async(req, res, next) => {
    try {
        let body = await repository.getById(req.params.id);
        res.status(200).send(body);    
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}