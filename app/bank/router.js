const express = require('express');
const router = express.Router();
const {bank, viewCreate, createBank, viewEdit, editBank, deleteBank} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', bank)
router.get('/create', viewCreate)
router.post('/create', createBank)
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', editBank)
router.delete('/delete/:id', deleteBank)

module.exports = router;