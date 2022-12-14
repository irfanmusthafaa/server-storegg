const express = require('express');
const router = express.Router();
const { landingPage, detailPage, category, checkout, history, historyDetail, dashboard, profile, editProfile } = require('./controller')
const multer = require('multer')
const os = require('os')

const { isLoginPlayer } = require('../middleware/auth')

router.get('/landingPage', landingPage)
router.get('/detail/:id', detailPage)
router.get('/category', category)
router.post('/checkout', isLoginPlayer, checkout)
router.get('/history', isLoginPlayer, history)
router.get('/history/detail/:id', isLoginPlayer, historyDetail)
router.get('/dashboard', isLoginPlayer, dashboard)
router.get('/profile', isLoginPlayer, profile)
router.put('/profile/:id', isLoginPlayer,  multer({ dest: os.tmpdir() }).single('image'), editProfile)

module.exports = router;