'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/cliente-controller');

router.post('/clientes', controllers.post);

module.exports = router;