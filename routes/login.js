var router = require('express').Router();
const passport = require('passport');
const invitesCtrl = require('../controllers/invites')

// The root route renders our only view
router.get('/login', function(req, res) {
  res.render('message',{
    title: 'Login',
    message: "You'll need to login before you can see that page.",
    user: req.user,
  });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    // successReturnToOrRedirect : '/',
    failureRedirect : '/'
  }
),invitesCtrl.processInvite);

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;