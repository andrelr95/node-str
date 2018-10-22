'use strict';

const mongoose = require('mongoose');
const Estoque = mongoose.model('Estoque');


exports.get = async(descricao) => {
    let res;
    if(descricao === undefined) res = await Estoque.find({}, 'descricao qtdeEstoque tipo ativo');
    else res = await Estoque.find({ descricao: { $regex: `^${descricao}`} }, 'descricao qtdeEstoque tipo ativo');
     
    return res;
}

exports.getById = async(id) => {
    const res = await Estoque.findById(id, 'descricao qtdeEstoque tipo ativo');
    return res;
}

exports.getByType = async(tipo, ativo) => {
    const res = await Estoque.find({
        tipo: tipo,
        ativo: ativo
    }, 'descricao qtdeEstoque tipo ativo');

    return res;
}

// exports.getByDescription = async(descricao) => {
//     const res = await Estoque.find({ descricao: { $regex: `^${descricao}`} }, 'descricao qtdeEstoque tipo ativo');
//     return res;
// }

exports.update = async(id, body) => {
    const res = await Estoque.findByIdAndUpdate(id, {
        $set: { 
            descricao: body.descricao,
            qtdeEstoque: body.qtdeEstoque,
            ativo: body.ativo
         }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Estoque.findByIdAndRemove(id); 
    return res;
}

exports.create = async(body) => {
    let estoque = new Estoque(body);
    await estoque.save();
}