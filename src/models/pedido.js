'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    numero: {
        type: String,
        required: true
    },
    precoTotal: {
        type: Number,
        required: true,
    },
    comidas: [{
        quantidade : {
            type: Number,
            required: true
        },
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Produto'
        }}],
    bebidas: [{
        quantidade : {
            type: Number,
            required: true
        },
        item: {
            type: Schema.Types.ObjectId,
            ref: 'Produto'
        }}],
    status: {
        type: String,
        required: false,
        default: 'Criado'
    },
    mensagem: {
        type: String,
        required: false
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente'
    }
});

module.exports = mongoose.model('Pedido', schema);