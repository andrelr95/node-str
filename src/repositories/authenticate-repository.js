'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

exports.authenticate = async(data) => {
    const res = await Cliente.findOne({
        usuario: data.usuario, 
        senha: data.senha
    });
    return res;
}
