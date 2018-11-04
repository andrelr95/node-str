'use strict';

const mongoose = require('mongoose');
const repository = require('../repositories/faturamento-repository');
const pedidoRepository = require('../repositories/pedido-repository');

exports.getByCodigo = async(req, res, next) => {
    try {
        let body = await repository.getFaturamentosByCodigo(req.params.codigo);
        if(body === null){
            res.status(404).send( { message: 'Não existe faturamento deste período' } );
        } else {
            res.status(200).send(body);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send( { message: 'Houve um erro interno do servidor' } );
    }
}

exports.pushPedidosToFaturamento = async(req, res, next) => {

    let codigo = req.params.codigo;
    let valorTotal;
    let pedidoFull;
    let pedido = req.body.pedido;
    
    await pedidoRepository.getById(pedido)
      .then( async (pedidoResponse) => {
          pedidoFull = pedidoResponse;
          await repository.getFaturamentosByCodigo(codigo)
            .then((faturamentoResponse) => {
              valorTotal = faturamentoResponse['valorTotal'] + pedidoFull['precoTotal']; 
            })
      })

    try{
        await repository.AddPedidosByCodigo(pedido, valorTotal, codigo);
        res.status(200).send( { message: 'Pedido adicionado a fatura', pedido: req.body.pedido } );
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({message: 'Faturamento criado com sucesso'})
    } catch(err) {
        console.log(err);
        res.status(500).send(err); 
    }
}