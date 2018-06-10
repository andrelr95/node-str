'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    preco: {
        type: Number,
        required: true,
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
    ingredientes: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingrediente'
    }]

});

module.exports = mongoose.model('Produto', schema);