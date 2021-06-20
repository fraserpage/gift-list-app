const express = require('express')
const router = express.Router()
const giftListCtrl = require('../controllers/giftLists')

router.post('/groups/:id/gift-list', giftListCtrl.create)
router.put('/groups/:id/gift-list/:listID', giftListCtrl.update)

module.exports = router
