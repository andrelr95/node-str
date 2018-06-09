'use strict';

const mongoose = require('mongoose');
const Endereco = mongoose.model('Endereco');

exports.create = async(body) => {
    let endereco = new Endereco(body);
    await endereco.insertMany().then(payload => {
        console.log("Payload endereco", payload)
        let filter = payload.filter(x => x._id);
        console.log("ids: ", filter); 
        return filter;
    });
}