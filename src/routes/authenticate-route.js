'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/authenticate-controller');

router.post('/', controllers.authenticate);

module.exports = router;