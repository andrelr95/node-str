'use strict';

const mongoose = require('mongoose');
const repository = require('../repositories/produto-repository');

exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({message: 'Produto cadastrado com sucesso'});     
    } catch(err) {
        res.status(400).send({message: 'Falha ao cadastrar o produto', data: err});
    }    
};

exports.get = async(req, res, next) => {
    try {
        let body = await repository.get(req.query.descricao);
        res.status(200).send(body);    
    } catch(err) {
        res.status(500).send(err);
    }
};

exports.getByType = async(req, res, next) => {
    try{
        let body = await repository.getByType(req.query.tipo);
        res.status(200).send(body);
    }catch(err){
        console.log(err)
        res.status(500).send({message: 'Houve um erro na requisição'});
    }
}

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
        res.status(200).send({ message: 'Produto atualizado com sucesso'});
    } catch(err) {
        res.status(400).send({ message: 'Falha ao atualizar produto'}, err);
    }
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.id);
        res.status(200).send( { message: 'Produto removido com sucesso'});
    } catch(err) {
        res.status(400).send({message : 'Falha ao remover produto',  data: err});
    }
};