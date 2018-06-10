'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/produto-controller');

router.get('/', controllers.get);
router.get('/:id', controllers.getById);
router.post('/', controllers.post);
router.put('/:id', controllers.put);
router.delete('/:id', controllers.delete);

module.exports = router; 