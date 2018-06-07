'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.post = (req, res, next) => {
    var cliente = new Cliente(req.body);
    cliente
        .save()
        .then(x => {
            res.status(201).send({message: 'Produto registrado com sucesso'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao cadastrar o produto', data: e});
        });
    }