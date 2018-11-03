'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    codigo: {
        type: String,
        required: false
    },
    mes: {
        type: String,
        required: false
    },
    ano: {
        type: String,
        required: false
    },
    valorTotal: {
        type: Number,
        required: false
    },
    pedidos: [{
        type: Schema.Types.ObjectId,
        ref: 'Pedido',
        required: false
    }]

})

module.exports = mongoose.model('Faturamento', schema);
