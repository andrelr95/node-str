'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Conecta ao banco
mongoose.connect('mongodb://andrelr:andrelr@ds044907.mlab.com:44907/nodestr');

// Carrega os models

const Product = require('./models/product');
const Cliente = require('./models/cliente');
const Pessoa = require('./models/pessoa');
const Endereco = require('./models/endereco');


// Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const clienteRoute = require('./routes/cliente-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/clientes', clienteRoute);

module.exports = app;