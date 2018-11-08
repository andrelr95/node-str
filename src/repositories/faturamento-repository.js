'use strict';

const mongoose = require('mongoose');
const Faturamento = mongoose.model('Faturamento');

exports.create = async(body) => {
    let faturamento = new Faturamento(body);
    await faturamento.save();
}

exports.AddPedidosByCodigo = async(pedido, valorTotal, codigo) => {

    return await Faturamento.findOneAndUpdate(
        { codigo: codigo }, 
        {  
            $push: {  pedidos: pedido  },
            $set: {  valorTotal: valorTotal  }  
        }
    )
}

exports.getFaturamentosByCodigo = async(codigo) => {
    return await Faturamento.findOne({
        codigo: codigo
    }, 'codigo mes ano valorTotal pedidos')
    .populate( 
        { 
            path: 'pedidos', 
            select: 'numero dataPedido precoTotal status numero cliente', 
            populate: {
                 path: 'cliente', 
                 select: 'pessoa.nome pessoa.sobrenome pessoa.cpf'  
                } 
            }
        )
}

