'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/produto-controller');
const authService = require('./../services/auth-service');

router.get('/', authService.authorize   , controllers.get);
router.get('/:id', authService.authorize, controllers.getById);
router.get('/itens/tipo', authService.authorize, controllers.getByType);
router.post('/', authService.isAdmin, controllers.post);
router.put('/:id', authService.isAdmin, controllers.put);
router.delete('/:id', authService.isAdmin, controllers.delete);

module.exports = router; 