const express = require('express');
const router = express.Router();
const { transaction, actionStatus } = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', transaction)
router.put('/status/:id', actionStatus)

module.exports = router;