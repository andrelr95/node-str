'use strict';

const mongoose = require('mongoose');
const repository = require('../repositories/ingrediente-repository');

exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({message: 'Ingrediente cadastrado com sucesso'});     
    } catch(err) {
        res.status(400).send({message: 'Falha ao cadastrar o ingrediente', data: err});
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

exports.decrementItem = async(req, res, next) => {
    try {
        await repository.decrementItem(req.params.id);
        res.status(200).send({ message: 'Ingrediente decrementado com sucesso'});
    } catch(err) {
        res.status(400).send({ message: 'Falha ao atualizar ingrediente'}, err);
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
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Ingrediente atualizado com sucesso'});
    } catch(err) {
        res.status(400).send({ message: 'Falha ao atualizar ingrediente'}, err);
    }
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.id);
        res.status(200).send( { message: 'Ingrediente removido com sucesso'});
    } catch(err) {
        res.status(400).send({message : 'Falha ao remover ingrediente',  data: err});
    }
};