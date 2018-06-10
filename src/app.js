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
const Ingrediente = require('./models/ingrediente');

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const produtoRoute = require('./routes/produto-route');
const clienteRoute = require('./routes/cliente-route');
const ingredienteRoute = require('./routes/ingrediente-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRoute);
app.use('/produtos', produtoRoute);
app.use('/clientes', clienteRoute);
app.use('/ingredientes', ingredienteRoute);


module.exports = app;