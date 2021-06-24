const router = require('express').Router();
const invitesCtrl = require('../controllers/invites')

// An invite link
router.get('/groups/:id/invite/:inviteId', invitesCtrl.show);

module.exports = router;