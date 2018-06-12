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

exports.decrementItem = async(id, quantidade) => {
    const estoque = await Estoque.findById(id);
    console.log("ESTOQUE> ID: " + id + " Descricao: " + estoque.descricao + " Quantidade Estoque: " + estoque.qtdeEstoque + " Quantidade a retirar: " + quantidade);
    if(estoque.qtdeEstoque > quantidade){
        await Estoque.findByIdAndUpdate(id, {
            $set: { 
                qtdeEstoque: estoque.qtdeEstoque - quantidade,
                ativo: true,
             }
        });
        return "Decrementado";
    } else if(estoque.qtdeEstoque == quantidade){
        await Estoque.findByIdAndUpdate(id, {
            $set: { 
                qtdeEstoque: estoque.qtdeEstoque - quantidade,
                ativo: false,
             }
        });
        return "Decrementado";
    } else {
        throw new Error("Itens do estoque faltando");
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