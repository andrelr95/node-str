'use strict';

const mongoose = require('mongoose');
const Ingrediente = mongoose.model('Ingrediente');


exports.get = async() => {
    const res = await Ingrediente.find({}, 'descricao qtdeEstoque ativo'); 
    return res;
}

exports.getById = async(id) => {
    const res = await Ingrediente.findById(id, 'descricao qtdeEstoque ativo');
    return res;
}

exports.decrementItem = async(id) => {
    const res = await Ingrediente.findByIdAndUpdate(id, {
        $set: { 
            qtdeEstoque: body.qtdeEstoque - 1,
         }
    });
    return res;
}

exports.update = async(id, body) => {
    const res = await Ingrediente.findByIdAndUpdate(id, {
        $set: { 
            descricao: body.descricao,
            qtdeEstoque: body.qtdeEstoque,
            ativo: body.ativo
         }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Ingrediente.findByIdAndRemove(id); 
    return res;
}

exports.create = async(body) => {
    let ingrediente = new Ingrediente(body);
    await ingrediente.save();
}