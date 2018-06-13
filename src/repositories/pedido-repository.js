'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');
const Estoque = mongoose.model('Estoque');
const produtoRepository = require('./produto-repository');


//TODO REFATORAR VALIDAÇÕES 'ACID' E TRATAMENTO DE ERROS DE ESTOQUE VAZIO AO CRIAR PEDIDO

exports.decrementItem = async(id, quantidade) => {
    const estoque =  await Estoque.findById(id);

    if(estoque.qtdeEstoque < quantidade){
        return;
    } else if(estoque.qtdeEstoque == quantidade){
        await Estoque.findByIdAndUpdate(id, {
            $set: { 
                qtdeEstoque: estoque.qtdeEstoque - quantidade,
                ativo: false,
            }
        });
    } else {
        await Estoque.findByIdAndUpdate(id, {
           $set: { 
               qtdeEstoque: estoque.qtdeEstoque - quantidade,
               ativo: true,
            }
       });
    }
}


exports.create = async(body) => {

        let comidas = body.comidas;
        let bebidas = body.bebidas;
    
        let errors = [];

        let produtos = comidas.concat(bebidas);
    
        produtos.forEach(async produto => {
            const payload = await produtoRepository.getById(produto.item)
            payload.ingredientes.forEach(async ingrediente => {
                try{
                    await this.decrementItem(ingrediente, produto.quantidade);
                } catch(err) {
                    console.log(err);
                    errors.push(err);
                }
            });
        })
        
        let pedido = new Pedido(body);
        await pedido.save();
}

exports.get = async() => {
    const res = await Pedido.find()
        .populate('cliente', 'pessoa')
        .populate({
            path: 'comidas.item', select: 'ativo ingrediente descricao preco tipo',
            populate: { path: 'ingredientes', select: 'descricao tipo ativo'}})
        .populate({
            path: 'bebidas.item', select: 'ativo ingrediente descricao preco tipo',
            populate: { path: 'ingredientes', select: 'descricao tipo ativo' } 
        }); 
    return res;
}

exports.getById = async(id) => {
    const res = await Pedido.findById(id)
    .populate('cliente', 'pessoa')
    .populate({
        path: 'comidas.item', select: 'ativo ingrediente descricao preco tipo',
        populate: { path: 'ingredientes', select: 'descricao tipo ativo'}})
    .populate({
        path: 'bebidas.item', select: 'ativo ingrediente descricao preco tipo',
        populate: { path: 'ingredientes', select: 'descricao tipo ativo' } 
    }); 
    return res;
}

exports.getByStatus = async(status) => {
    const res = await Pedido.find({
        status: status
    })
    .populate('cliente', 'pessoa')
    .populate({
        path: 'comidas.item', select: 'ativo ingrediente descricao preco tipo',
        populate: { path: 'ingredientes', select: 'descricao tipo ativo'}})
    .populate({
        path: 'bebidas.item', select: 'ativo ingrediente descricao preco tipo',
        populate: { path: 'ingredientes', select: 'descricao tipo ativo' } 
    }); 
    
    return res;
}
