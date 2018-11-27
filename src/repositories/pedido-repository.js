'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');
const Estoque = mongoose.model('Estoque');
const produtoRepository = require('./produto-repository');
const faturamentoRepository = require('./faturamento-repository');


//TODO REFATORAR VALIDAÇÕES 'ACID' E TRATAMENTO DE ERROS DE ESTOQUE VAZIO AO CRIAR PEDIDO

exports.decrementItem = async(id, quantidade) => {
    const estoque =  await Estoque.findById(id);
    
    await Estoque.findByIdAndUpdate(id, 
        {
            $set: { 
            qtdeEstoque: estoque.qtdeEstoque - 1,
        }
    })

    console.log("DECREMENTANDO ", id);


    // if(estoque.qtdeEstoque < quantidade){
    //     return;
    // } else if(estoque.qtdeEstoque == quantidade){
    //     await Estoque.findByIdAndUpdate(id, {
    //         $set: { 
    //             qtdeEstoque: estoque.qtdeEstoque - 1,
    //             ativo: false,
    //         }
    //     });
    // } else {
    //     await Estoque.findByIdAndUpdate(id, {
    //        $set: { 
    //            qtdeEstoque: estoque.qtdeEstoque - 1,
    //            ativo: true,
    //         }
    //    });
    // }
    
}


exports.create = async(body) => {
        let comidas = body.comidas;
        let bebidas = body.bebidas;
        let errors = [];
        let produtos = comidas.concat(bebidas);
        let lastPedido = await Pedido.findOne({}).sort( { numero: -1 } );
        let numeroPedido = 1;

        // console.log("ULTIMO PEDIDO", lastPedido);
        if(lastPedido !== null){ 
            numeroPedido = Number(lastPedido.numero) + 1;
            console.log(numeroPedido);
        } 

        console.log("PRODUTOS: ", produtos);
        
    
        produtos.forEach(async produto => {
            const payload = await produtoRepository.getById(produto.item)
            payload.ingredientes.forEach(async ingrediente => {
                console.log("INGREDIENTE: ", ingrediente);
                try{
                    console.log("A DECREMENTAR : ", ingrediente);
                    for(let i = 0; i < produto.quantidade; i++) {
                        await Estoque.findByIdAndUpdate(ingrediente, 
                            {
                                $inc: { 
                                qtdeEstoque: - 1,
                            }
                        })
                    }
                    console.log("DECREMENTOU : ", ingrediente);

                } catch(err) {
                    console.log(err);
                    errors.push(err);
                }
            });
        })

        // body['numero'] = `${Math.floor(Math.random()*90000) + 10000}`;
        body['numero'] = numeroPedido;        
        body['dataPedido'] = new Date();
        let pedido = new Pedido(body);
        await pedido.save();
}       

exports.update = async(id, body) => {
    console.log(id)
    let pedido = await Pedido.findByIdAndUpdate(id, {
        $set: { 
            status: body.status 
        }
    });

    return pedido;
}

exports.get = async() => {
    let pedidos = await Pedido.find()
       .populate('cliente', 'pessoa')
       .populate({
           path: 'comidas.item', select: 'ativo ingrediente descricao preco tipo',
           populate: { path: 'ingredientes', select: 'descricao tipo ativo'}})
       .populate({
           path: 'bebidas.item', select: 'ativo ingrediente descricao preco tipo',
           populate: { path: 'ingredientes', select: 'descricao tipo ativo' } 
       }); 
       pedidos.forEach((pedido) => pedido.status === 'cancelado' || pedido.status === 'entregue' ? pedido.ativo = false : pedido.ativo = true)
       return pedidos;
   }

exports.getPedidosByStatus = async(status) => {
    let pedidos =  await Pedido.find({
        status: status,
    })
    .populate('cliente', 'pessoa')
    .populate({
        path: 'comidas.item', select: 'ativo ingrediente descricao preco tipo',
        populate: { path: 'ingredientes', select: 'descricao tipo ativo'}})
    .populate({
        path: 'bebidas.item', select: 'ativo ingrediente descricao preco tipo',
        populate: { path: 'ingredientes', select: 'descricao tipo ativo' } 
    });
    pedidos.forEach((pedido) => pedido.status === 'cancelado' || pedido.status === 'entregue' ? pedido.ativo = false : pedido.ativo = true)
    return pedido;
}

exports.getPedidosByCliente = async(cliente) => {
    let pedidos = await Pedido.find({
        cliente: cliente
    })    
    .populate('cliente', 'pessoa')
    .populate({
        path: 'comidas.item', select: 'ativo ingrediente descricao preco tipo',
        populate: { path: 'ingredientes', select: 'descricao tipo ativo'}})
    .populate({
        path: 'bebidas.item', select: 'ativo ingrediente descricao preco tipo',
        populate: { path: 'ingredientes', select: 'descricao tipo ativo' } 
    });
    pedidos.forEach((pedido) => pedido.status === 'cancelado' || pedido.status === 'entregue' ? pedido.ativo = false : pedido.ativo = true)
    return pedidos;
}


exports.getPedidosByStatusAndCliente = async(status, cliente) => {
    return await Pedido.find({
        status: status,
        cliente: cliente
    })
    .populate('cliente', 'pessoa')
    .populate({
        path: 'comidas.item', select: 'ativo ingrediente descricao preco tipo',
        populate: { path: 'ingredientes', select: 'descricao tipo ativo'}})
    .populate({
        path: 'bebidas.item', select: 'ativo ingrediente descricao preco tipo',
        populate: { path: 'ingredientes', select: 'descricao tipo ativo' } 
    }); 
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


