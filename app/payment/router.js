const express = require('express');
const router = express.Router();
const { payment, viewCreate, createPayment, viewEdit, editPayment, deletePayment, actionStatus } = require('./controller')

router.get('/', payment)
router.get('/create', viewCreate)
router.post('/create', createPayment)
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', editPayment)
router.delete('/delete/:id', deletePayment)
router.put('/status/:id', actionStatus)

module.exports = router;