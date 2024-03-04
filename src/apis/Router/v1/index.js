const express = require('express');

const router = express.Router();

const Profie = require('./profileRoute');

const address = require('./addressRoute');

router.use('/address', address);

router.use('/user', Profie);


module.exports = router;
