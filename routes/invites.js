const router = require('express').Router();
const invitesCtrl = require('../controllers/invites')

// An invite link (via email)
router.get('/groups/:id/invite/:inviteId', invitesCtrl.show);

module.exports = router;