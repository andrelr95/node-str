'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    sobrenome: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    enderecos: [{
        type: Schema.Types.ObjectId,
        ref: 'Endereco'
    }],
    dataNasc: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Pessoa', schema);