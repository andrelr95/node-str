'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enderecoSchema = new Schema({
        id: {
            type: Number,
            required: true,
            trim: true
        },
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
        id: {
            type: Number,
            required: false,
            trim: true
        },
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
    cliente: { 
        id: {
            type: Number,
            required: false,
            trim: true
        },
        pessoa: pessoaSchema
    }
})
module.exports = mongoose.model('Cliente', schema);