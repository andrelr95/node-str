'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
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
        },
        logradouro: {
            type: String,
            required: true,
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

module.exports = mongoose.model('Endereco', schema);