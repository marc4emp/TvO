const express = require('express');
const router = express.Router();
const channels = require('./channels')
const users = require('./users')

/* GET home page. */
router.use('/channels', channels)
router.use('/users', users)

module.exports = router;
