'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');


exports.get = async() => {
    const res = await Cliente.find(); 
    return res;
}

exports.getById = async(id) => {
    const res = await Cliente.findById(id);
    return res;
}

exports.update = async(id, body) => {
    const res = await Cliente.findByIdAndUpdate(id, {
        $set: {
            pessoa: body    
        }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Cliente.findByIdAndRemove(id); 
    return res;
}

exports.create = async(body) => {
    let cliente = new Cliente(body);
    const res = await cliente.save();
    return res._id;
}