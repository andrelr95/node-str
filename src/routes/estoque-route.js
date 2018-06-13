'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/estoque-controller');
const authService = require('./../services/auth-service');

router.post('/', authService.authorize, controllers.post);
router.get('/', authService.authorize, controllers.get);
router.get('/:id', authService.authorize, controllers.getById);
router.get('/itens/tipo', authService.authorize, controllers.getByType);
router.put('/:id', authService.authorize, controllers.put);
router.delete('/:id', authService.authorize, controllers.delete);

module.exports = router;