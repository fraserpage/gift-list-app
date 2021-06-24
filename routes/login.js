var router = require('express').Router();
const passport = require('passport');
const Group = require('../models/group')

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
),async function(req, res) {
  // Successful authentication, redirect home.

  console.log('session',req.session.invite)
  // if this was login in response to invite
  if (req.session.invite){
    const group = await Group.findById(req.session.invite.group)
    const invite = group.invites.id(req.session.invite.invite)
    delete req.session.invite
    if (invite){
      console.log('group before',group)
      group.users.push(req.user._id)
      invite.remove()
      await group.save()
      console.log('group after',group)
    }
    // do we want to send a flash message here?
    res.redirect('/groups/'+req.params.id)
  }
  else{
    res.redirect('/');
  }
});

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;