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

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send( { message: 'Pedido atualizado com sucesso' } );
    } catch(err) {
        res.status(400).send( { message: 'Falha ao atualizar o pedido', data: err } );
    }
}

exports.get = async(req, res, next) => {
    const status = req.query.status;
    const cliente = req.query.cliente;
    let body;
    try {
        if(cliente === undefined && status === undefined) body = await repository.get(); 
        else if (cliente === undefined) body = await repository.getPedidosByStatus(status);
        else body = await repository.getPedidosByStatusAndCliente(status, cliente);
        res.status(200).send(body);    
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
};

// exports.getPedidosByCliente = async(req, res, next) => {
//     try{
//         let body = await repository.getPedidosByCliente(req.params.pedido, req.params.cliente);
//         res.status(200).send(body);
//     } catch(err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// }

exports.getById = async(req, res, next) => {
    try {
        let body = await repository.getById(req.params.id);
        res.status(200).send(body);    
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}