'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/cliente-controller');
const authService = require('./../services/auth-service');


router.post('/', controllers.post);
router.get('/', authService.isAdmin, controllers.get);
router.get('/:id', authService.authorize, controllers.getById);
router.put('/:id', authService.authorize, controllers.put);
router.delete('/:id', authService.authorize, controllers.delete);

module.exports = router;