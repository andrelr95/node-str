'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/faturamento-controller');
const authService = require('./../services/auth-service');

router.post('/', authService.isAdmin, controllers.post);
// router.get('/', authService.isAdmin, controllers.get);
router.get('/:codigo', authService.isAdmin, controllers.getByCodigo);
// router.get('/itens/tipo', authService.isAdmin, controllers.getByType);
router.put('/:codigo', authService.isAdmin, controllers.pushPedidosToFaturamento);
// router.delete('/:id', authService.isAdmin, controllers.delete);

module.exports = router;