'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/pedido-controller');
const authService = require('./../services/auth-service');


router.get('/', authService.authorize, controllers.get);
router.post('/', authService.authorize, controllers.post);
router.get('/:id', authService.authorize, controllers.getById);
router.put('/:id', authService.authorize, controllers.put);
// router.get('/pedido/status', authService.authorize, controllers.getByStatus);


module.exports = router; 