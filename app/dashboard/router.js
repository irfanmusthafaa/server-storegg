const express = require('express');
const router = express.Router();
const {dashboard} = require('./controller')

/* GET home page. */
router.get('/', dashboard)

module.exports = router;
