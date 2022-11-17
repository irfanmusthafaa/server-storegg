const express = require('express');
const router = express.Router();
const {nominal, viewCreate, createNominal, viewEdit, editNominal, deleteNominal} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', nominal)
router.get('/create', viewCreate)
router.post('/create', createNominal)
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', editNominal)
router.delete('/delete/:id', deleteNominal)

module.exports = router;