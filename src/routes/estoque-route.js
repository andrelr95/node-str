'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/estoque-controller');

router.post('/', controllers.post);
router.get('/', controllers.get);
router.get('/:id', controllers.getById);
router.get('/itens/tipo', controllers.getByType);
router.put('/:id', controllers.put);
router.delete('/:id', controllers.delete);

module.exports = router;