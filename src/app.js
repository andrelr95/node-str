'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// Conecta ao banco
mongoose.connect(config.connectionString);

// Carrega os models

const Produto = require('./models/produto');
const Cliente = require('./models/cliente');
const Estoque = require('./models/estoque');
const Pedido = require('./models/pedido');
const Faturamento = require('./models/faturamento');

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const produtoRoute = require('./routes/produto-route');
const pedidoRoute = require('./routes/pedido-route');
const clienteRoute = require('./routes/cliente-route');
const estoqueRoute = require('./routes/estoque-route');
const faturamentoRoute = require('./routes/faturamento-route');
const authenticateRoute = require('./routes/authenticate-route');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRoute);
app.use('/produtos', produtoRoute);
app.use('/clientes', clienteRoute);
app.use('/estoque', estoqueRoute);
app.use('/pedidos', pedidoRoute);
app.use('/faturamentos', faturamentoRoute);
app.use('/authenticate', authenticateRoute);


module.exports = app;