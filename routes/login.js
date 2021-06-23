var router = require('express').Router();
const passport = require('passport');

// The root route renders our only view
router.get('/login', function(req, res) {
  res.render('login',{
    title: 'Login',
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
    successReturnToOrRedirect : '/',
    failureRedirect : '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;