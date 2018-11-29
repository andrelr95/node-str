'use strict';

const mongoose = require('mongoose');
const Faturamento = mongoose.model('Faturamento');
const moment = require('moment');

exports.create = async(body) => {
    let faturamento = new Faturamento(body);
    await faturamento.save();
}

exports.createFromDate = async(pedido, valorTotal) => {
    const objDate = new Date();
    const locale = 'pt-br';
    
    // let fullMonth = objDate.toLocaleString(locale, { month: "long" }).toString();
    let fullMonth = moment().format('MMMM');
    console.log(fullMonth);
    let month = (objDate.getMonth() + 1).toString();
    let year = objDate.getFullYear().toString();
    let codigo = month.concat(year);
    let pedidos = [pedido];

    let body = new Object({});
    
    body.codigo = codigo;
    body.mes = objDate.toLocaleString(locale, { month: "long" }).toString();;
    body.ano = year;
    body.valorTotal = valorTotal;
    body.pedidos = pedidos;

    console.log(body);
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

