const express = require('express')
const router = express.Router()
const giftsCtrl = require('../controllers/gifts')

router.post('/groups/:id/gift-lists/:listId', giftsCtrl.create)
router.put('/groups/:id/gift-lists/:listId/gift/:giftId', giftsCtrl.update)
router.put('/groups/:id/gift-lists/:listId/gift/:giftId/claim', giftsCtrl.claim)
router.delete('/groups/:id/gift-lists/:listId/gift/:giftId', giftsCtrl.delete)

module.exports = router
