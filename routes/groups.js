const express = require('express')
const router = express.Router()
const groupCtrl = require('../controllers/groups')

/* /groups */
router.get('/', groupCtrl.index)
// router.get('/new', isLoggedIn, groupCtrl.new)
router.get('/:id', groupCtrl.show)

router.post('/', groupCtrl.create)
router.put('/:id', groupCtrl.update)


module.exports = router
