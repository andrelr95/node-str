'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/cliente-controller');

router.post('/', controllers.post);

module.exports = router;