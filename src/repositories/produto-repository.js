'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');


exports.get = async(descricao) => {
    // const res = await Produto.find({}, 'descricao preco ingredientes cliente tipo ativo').populate('ingredientes', 'descricao tipo');
    let res;
    if(descricao === undefined) {
        res = await Produto.find({}, 'descricao preco ingredientes cliente tipo ativo')
            .populate('ingredientes', 'descricao tipo ativo');
    } else {
        res = await Produto.find({ descricao: { $regex: `^${descricao}`} }, 'descricao preco ingredientes cliente tipo ativo')
        .populate('ingredientes', 'descricao tipo ativo');
    }
    return res;
}

exports.getById = async(id) => {
    const res = await Produto.findById(id);
    return res;
}

exports.getByType = async(tipo) => {
    const res = await Produto.find({
        tipo: tipo
    }, 'descricao preco ingredientes cliente tipo ativo').populate('ingredientes', 'descricao tipo ativo');

    return res;
}

exports.getByDescription = async(descricao) => {
    const res = await Produto.find({ descricao: { $regex: `^${descricao}`} }, 'descricao qtdeEstoque tipo ativo');
    return res;
}

exports.update = async(id, body) => {
    const res = await Produto.findByIdAndUpdate(id, {
        $set: { 
            descricao: body.descricao,
            preco: body.preco,
            ativo: body.ativo,
            tipo: body.tipo,
            ingredientes: body.ingredientes,
         }
    });
    return res;
}

exports.updateStatus = async(id, body) => {
    const res = await Produto.findByIdAndUpdate(id, {
        $set: {
            ativo: body.ativo
        }
    })

    return res;
}

exports.delete = async(id) => {
    const res = await Produto.findByIdAndUpdate(id, {
        $set: {
            ativo: false
        }
    }); 
    return res;
}

exports.create = async(body) => {
    let produto = new Produto(body);
    await produto.save();
}