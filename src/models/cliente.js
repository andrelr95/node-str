'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: {
        type: Number,
        required: true,
        trim: true
    },
    pessoa: {
        id: {
            type: Number,
            required: true,
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
        enderecos: [
            {
                id: {
                    type: Number,
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
            }
        ],
        dataNasc: {
            type: String,
            required: true,
            trim: true
        }
    }
});

module.exports = mongoose.model('Cliente', schema);