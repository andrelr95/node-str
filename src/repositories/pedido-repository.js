'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');
const Estoque = mongoose.model('Estoque');
const produtoRepository = require('./produto-repository');

exports.decrementItem = (id, quantidade) => {
    const estoque =  Estoque.findById(id);
    if(estoque.qtdeEstoque > quantidade){
         Estoque.findByIdAndUpdate(id, {
            $set: { 
                qtdeEstoque: estoque.qtdeEstoque - quantidade,
                ativo: true,
             }
        });
    } else if(estoque.qtdeEstoque == quantidade){
         Estoque.findByIdAndUpdate(id, {
            $set: { 
                qtdeEstoque: estoque.qtdeEstoque - quantidade,
                ativo: false,
             }
        });
    } else {
        throw new Error("Itens do estoque faltando");
    }
}


exports.create = async(body) => {

        console.log(body);
    
        let comidas = body.comidas;
        let bebidas = body.bebidas;
    
        let produtos = comidas.concat(bebidas);
    
        produtos.forEach(async produto => {
            const payload = await produtoRepository.getById(produto.item)
            payload.ingredientes.forEach(ingrediente => {
                try{
                    this.decrementItem(ingrediente, produto.quantidade)
                } catch(err) {
                    console.log("catch: ", err);
                }
            });
        });
        
        throw new Error("DEI PQ EU QUIS")
        
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
