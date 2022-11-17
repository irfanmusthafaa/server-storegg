const express = require('express');
const router = express.Router();
const {category, viewCreate, createCategory, viewEdit, editCategory, deleteCategory} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
router.get('/', category)
router.get('/create', viewCreate)
router.post('/create', createCategory)
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', editCategory)
router.delete('/delete/:id', deleteCategory)

module.exports = router;
