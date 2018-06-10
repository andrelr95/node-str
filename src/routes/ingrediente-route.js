'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/ingrediente-controller');

router.post('/', controllers.post);
router.get('/', controllers.get);
router.get('/:id', controllers.getById);
router.put('/:id', controllers.put, controllers.decrementItem);
router.delete('/:id', controllers.delete);

module.exports = router;