'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Conecta ao banco
mongoose.connect('mongodb://andrelr:andrelr@ds044907.mlab.com:44907/nodestr');

// Carrega os models

const Produto = require('./models/produto');
const Cliente = require('./models/cliente');
const Estoque = require('./models/estoque');
const Pedido = require('./models/pedido');

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const produtoRoute = require('./routes/produto-route');
const pedidoRoute = require('./routes/pedido-route');
const clienteRoute = require('./routes/cliente-route');
const estoqueRoute = require('./routes/estoque-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRoute);
app.use('/produtos', produtoRoute);
app.use('/clientes', clienteRoute);
app.use('/estoque', estoqueRoute);
app.use('/pedidos', pedidoRoute);


module.exports = app;