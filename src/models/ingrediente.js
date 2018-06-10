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
    ativo: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Ingrediente', schema);
