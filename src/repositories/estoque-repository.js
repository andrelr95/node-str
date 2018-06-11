'use strict';

const mongoose = require('mongoose');
const Estoque = mongoose.model('Estoque');


exports.get = async() => {
    const res = await Estoque.find({}, 'descricao qtdeEstoque tipo ativo'); 
    return res;
}

exports.getById = async(id) => {
    const res = await Estoque.findById(id, 'descricao qtdeEstoque tipo ativo');
    return res;
}

exports.getByType = async(tipo) => {
    const res = await Estoque.find({
        tipo: tipo
    }, 'descricao qtdeEstoque tipo ativo');

    return res;
}

exports.decrementItem = async(id) => {
    const estoque = await Estoque.findById(id);
    if(estoque.qtdeEstoque > 1){
        await Estoque.findByIdAndUpdate(id, {
            $set: { 
                qtdeEstoque: estoque.qtdeEstoque - 1,
                ativo: true
             }
        });
    }else if(estoque.qtdeEstoque == 1){
        await Estoque.findByIdAndUpdate(id, {
            $set: { 
                qtdeEstoque: estoque.qtdeEstoque - 1,
                ativo: false,
             }
        });
    } else {
        return;
    }
}

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