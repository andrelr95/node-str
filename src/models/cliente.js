'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        id: {
            type: Number,
            required: false,
            trim: true
        },
        pessoa: {
            type: Schema.Types.ObjectId,
            reg: 'Pessoa'
        }
});

module.exports = mongoose.model('Cliente', schema);