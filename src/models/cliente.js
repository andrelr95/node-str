'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enderecoSchema = new Schema({
        cep: {
            type: String,
            required: true,
            trim: true
        },
        estado: {
            type: String,
            required: true,
            trim: true
        },
        cidade: {
            type: String,
            required: true,
            trim: true
        },
        bairro: {
            type: String,
            required: true,
            trim: true
        },
        logradouro: {
            type: String,
            required: true,
            trim: true
        },
        numero: {
            type: String,
            required: true,
            trim: true
        },
        complemento: {
            type: String,
            required: true,
            trim: true
        }
    });

const pessoaSchema = new Schema({
        nome: {
            type: String,
            required: true,
            trim: true
        },
        sobrenome: {
            type: String,
            required: true,
            trim: true
        },
        cpf: {
            type: String,
            required: true,
            trim: true
        },
        telefone: {
            type: String,
            required: true,
            trim: true
        },
        sexo: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        enderecos: [enderecoSchema],
        dataNasc: {
            type: String,
            required: true,
            trim: true
        }
})


const schema = new Schema({
    usuario: {
        type: String,
        required: false
    },
    senha: {
        type: String,
        required: false
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }],
    pessoa: pessoaSchema
})
module.exports = mongoose.model('Cliente', schema);