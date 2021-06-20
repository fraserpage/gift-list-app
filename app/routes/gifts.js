const express = require('express')
const router = express.Router()
const giftsCtrl = require('../controllers/gifts')

router.post('/groups/:id/gift-list/:listID', giftsCtrl.create)
router.put('/groups/:id/gift-list/:listID/gift/:giftID', giftsCtrl.update)
router.delete('/groups/:id/gift-list/:listID/gift/:giftID', giftsCtrl.delete)

module.exports = router
