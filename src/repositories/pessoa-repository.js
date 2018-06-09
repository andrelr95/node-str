'use strict';

const mongoose = require('mongoose');
const Pessoa = mongoose.model('Pessoa');

exports.create = async(body) => {
    let enderecos = await enderecoRepository.create(body.enderecos);
    let pessoa = new Pessoa(body);
    
    await pessoa.save();
}