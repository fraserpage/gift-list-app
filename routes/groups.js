const express = require('express')
const router = express.Router()
const groupCtrl = require('../controllers/groups')

/* /groups */
router.get('/', groupCtrl.index)
router.get('/new', groupCtrl.new)
// router.get('/new', isLoggedIn, groupCtrl.new)
router.get('/:id', groupCtrl.show)
router.get('/:id/edit', groupCtrl.edit)

router.post('/', groupCtrl.create)
router.put('/:id', groupCtrl.update)
router.put('/:id/invite', groupCtrl.invite)


module.exports = router
