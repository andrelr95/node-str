'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.post = (req, res, next) => {
    let cliente = new Cliente(req.body);
    cliente
        .save()
        .then(x => {
            res.status(201).send({message: 'Produto registrado com sucesso'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao cadastrar o produto', data: e});
        });
    };

exports.get = (req, res, next) => {
    Cliente.find()
        .then(payload => {
            res.status(200).send(payload);
        })
        .catch(err => {
            res.status(400).send(err);
        })
};

exports.getById = (req, res, next) => {
    Cliente.findById(req.params.id)
    .then(payload => {
        res.status(200).send(payload);
    }).catch(e => {
        res.status(400).send(err);
    });
};

exports.put = (req, res, next) => {
    Cliente.findByIdAndUpdate(req.params.id, {
        $set: {
            cliente: req.body.cliente
        }
    }).then(payload => {
        res.status(200).send({ message: 'Produto atualizado com sucesso'});
    }).catch(e => {
        res.status(400).send({ message: 'Falha ao atualizar produto'}, e);
    })
};

exports.delete = (req, res, next) => {
    Cliente.findOneAndRemove(req.params.id)
        .then(payload => {
            res.status(200).send( { message: 'Cliente removido com sucesso'});
        })
        .catch(err => {
            res.status(400).send({message : 'Falha ao remover cliente',  data: err});
        })
};