'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/estoque-controller');
const authService = require('./../services/auth-service');

router.post('/', authService.isAdmin, controllers.post);
router.get('/', authService.isAdmin, controllers.getByDescription);
router.get('/:id', authService.isAdmin, controllers.getById);
router.get('/itens/tipo', authService.isAdmin, controllers.getByType);
router.put('/:id', authService.isAdmin, controllers.put);
router.delete('/:id', authService.isAdmin, controllers.delete);

module.exports = router;