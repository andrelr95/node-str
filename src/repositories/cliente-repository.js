'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.get = async() => {
    const res = await Cliente.find({}, 'usuario senha roles pessoa'); 
    return res;
}

exports.getByCpf = async(cpf) => {
    const res = await Cliente.find(
        { 
            'pessoa.cpf': { $regex: `^${cpf}` }
        },
        'usuario senha roles pessoa'
    )
    return res;
}

exports.getById = async(id) => {
    const res = await Cliente.findById(id);
    return res;
}

exports.update = async(id, body) => {
    const res = await Cliente.findByIdAndUpdate(id, {
        $set: { 
            senha: body.senha,
            pessoa: body.pessoa 
        }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Cliente.findByIdAndRemove(id); 
    return res;
}

exports.create = async(body) => {
    let cliente = new Cliente(body);
    await cliente.save();
}