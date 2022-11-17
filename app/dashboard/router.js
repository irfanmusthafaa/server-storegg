const express = require('express');
const router = express.Router();
const {dashboard} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', dashboard)

module.exports = router;
