'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    qtdeEstoque: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        trim: true
    },
    ativo: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Estoque', schema);
