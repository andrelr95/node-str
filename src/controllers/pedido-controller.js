'use strict';

const mongoose = require('mongoose');
const repository = require('../repositories/pedido-repository');
const faturamentoRepository = require('../repositories/faturamento-repository');

exports.post = async(req, res, next) => {
    try {
        await repository.create(req.body);
        res.status(201).send({message: 'Pedido criado com sucesso'});     
    } catch(err) {
        console.log(err)
        res.status(400).send({message: 'Falha realizar o pedido', data: err});
    }    
};

exports.put = async(req, res, next) => {
    const pedidoCodigo = req.params.id;
    const status = req.body.status;
    const date = new Date();
    const codigo = ( date.getMonth() + 1 ).toString().concat(date.getFullYear().toString());
    let faturamento = await faturamentoRepository.getFaturamentosByCodigo(codigo);
    let pedido; 
    let valorTotal;

    try {
        if(status === 'entregue') {
            console.log("STEP 1 - RECUPERAR PEDIDOS");
            await repository.getById(pedidoCodigo)
                .then( async ( pedidoResponse ) => {
                    pedido = pedidoResponse;
                    console.log("STEP 2 - PEDIDO");
                    if(faturamento === null) {
                        console.log("NÃO EXISTE FATURAMENTO, CRIANDO NOVO...  ", pedidoCodigo, pedido['precoTotal']);
                        await faturamentoRepository.createFromDate(pedidoCodigo, pedido['precoTotal']);
                    } else {
                        console.log("ATUALIZANDO FATURAMENTO!");
                        await faturamentoRepository.getFaturamentosByCodigo(codigo)
                            .then((faturamentoResponse) => {
                                valorTotal = faturamentoResponse['valorTotal'] + pedido['precoTotal']; 
                            })
                            console.log(`SUCESSO = ADD PEDIDO TO FATURAMENTO: pedido: ${pedidoCodigo} | valor total: ${valorTotal} | codigo: ${codigo}`);
                            faturamentoRepository.AddPedidosByCodigo(pedido, valorTotal, codigo);
                    }
            })

        }

        await repository.update(req.params.id, req.body);
        res.status(200).send( { message: 'Pedido atualizado com sucesso', data: req.body } );
    } catch(err) {
        res.status(400).send( { message: 'Falha ao atualizar o pedido', data: err } );
    }
}

exports.get = async(req, res, next) => {
    const status = req.query.status;
    const cliente = req.query.cliente;
    const ativo = req.query.ativo;

    let body;
    try {
        if(cliente === undefined && status === undefined) body = await repository.get(); 
     
        else if (cliente === undefined) body = await repository.getPedidosByStatus(status);
     
        else if(status === undefined) body = await repository.getPedidosByCliente(cliente)

        else body = await repository.getPedidosByStatusAndCliente(status, cliente);
        res.status(200).send(body);    
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
};

// exports.getPedidosByCliente = async(req, res, next) => {
//     try{
//         let body = await repository.getPedidosByCliente(req.params.pedido, req.params.cliente);
//         res.status(200).send(body);
//     } catch(err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// }

exports.getById = async(req, res, next) => {
    try {
        let body = await repository.getById(req.params.id);
        res.status(200).send(body);    
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}