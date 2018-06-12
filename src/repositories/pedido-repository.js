'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');
const estoqueRepository = require('./estoque-repository');
const produtoRepository = require('./produto-repository');


exports.create = async(body) => {

    let ids = body.comidas.concat(body.bebidas);
    console.log(ids.length) 
    
    ids.map(id => {
        produtoRepository.getById(id).then(payload => {
            payload.ingredientes.map(ingrediente => {
                estoqueRepository.decrementItem(ingrediente);
                console.log('Decrementou', ingrediente);
            })
        })
    })

    let pedido = new Pedido(body);
    await pedido.save();
}

exports.get = async() => {
    const res = await Pedido.find()
        .populate('cliente', 'pessoa')
        .populate({
            path: 'comidas',
            populate: { path: 'ingredientes', select: 'descricao tipo ativo' }
        })
        .populate('bebidas', 'descricao preco tipo'); 
    return res;
}

/* exports.getById = async(id) => {
    const res = await Pedido.findById(id);
    return res;
}

exports.getByType = async(tipo) => {
    const res = await Pedido.find({
        tipo: tipo
    });

    return res;
}

exports.update = async(id, body) => {
    const res = await Pedido.findByIdAndUpdate(id, {
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

exports.delete = async(id) => {
    const res = await Pedido.findByIdAndRemove(id); 
    return res;
}
 */