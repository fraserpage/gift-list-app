const Group = require('../models/group')

module.exports = {
  show,
  processInvite
};

async function show(req, res){
  const group = await Group.findById(req.params.id)
  const invite = group.invites.id(req.params.inviteId)

  if (req.user){
    console.log('user is logged in')
    if (group.users.some((user)=>user.equals(req.user._id))){
    // user is already in the group
      console.log('user is already in group')
      res.redirect('/groups/'+req.params.id)
      return
    }
    if(invite){
    // invite exists && user is logged in 
    // - add user to group and remove invite
      group.users.push(req.user._id)
      invite.remove()
      await group.save()
      // do we want to send a flash message here?
      res.redirect('/groups/'+req.params.id)
    }
  }
  else {
  // user not logged in
    if (invite){
    // user not logged in - sett session var for adding user to group after login
      req.session.invite = {group: req.params.id, invite: req.params.inviteId};
      res.render('message',{
        title: 'Login',
        message: "Welcome! Login with Google to get started.",
        user: req.user,
      })
    }
    else{
      // invite has been used already && user not logged in
      // send them to the group - they'll have to login first
      res.redirect('/groups/'+req.params.id)
    }
  }
}

// Called on successful authentication
async function processInvite(req, res) {
  // does session invite exist? 
  if (req.session.invite){
    console.log('session exists',req.session.invite)
    const group = await Group.findById(req.session.invite.group)
    const invite = group.invites.id(req.session.invite.invite)
    delete req.session.invite
    // is the invite still valid?
    if (invite){
      console.log('invite exists',invite)
      // add the user to the group and remove the invite
      group.users.push(req.user._id)
      invite.remove()
      await group.save()
      console.log('group after invite removed',group)
    }
    // do we want to send a flash message here?
    res.redirect('/groups/'+req.params.id)
  }
  else{
    res.redirect('/');
  }
}