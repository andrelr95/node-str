'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/pedido-controller');

router.get('/', controllers.get);
router.post('/', controllers.post);

/* 
router.get('/:id', controllers.getById);
router.get('/itens/tipo', controllers.getByType);
router.put('/:id', controllers.put);
router.delete('/:id', controllers.delete); */

module.exports = router; 