const express = require('express');
const router = express.Router();
const { voucher, viewCreate, createVoucher, viewEdit, editVoucher, deleteVoucher, actionStatus} = require('./controller')
const multer = require('multer')
const os = require('os')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', voucher)
router.get('/create', viewCreate)
router.post('/create', multer({ dest: os.tmpdir() }).single('image'), createVoucher);
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', multer({ dest: os.tmpdir() }).single('image'), editVoucher)
router.delete('/delete/:id', deleteVoucher)
router.put('/status/:id', actionStatus)

module.exports = router;