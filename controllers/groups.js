const Group = require('../models/group')
const sendMail = require('../mail/sendMail')

module.exports = { 
  index, 
  show, 
  new: newGroup, 
  delete: deleteOne,
  edit,
  invite,
  create, update 
}

async function index(req,res){
    // find groups that the user is a member of
    const groups = await Group.find({ users: req.user._id }).populate('users')
    res.render('groups/index',{
      title:'groups', 
      user: req.user,
      groups,
    })
}

async function show(req,res){
  const group = await Group.findById(req.params.id)
  .populate('users')
  .populate('owner')
  .populate('invites')
  .populate('giftLists.user')
  .populate('giftLists.gifts.claimedBy')
  .exec()
  res.render('groups/show',{
    title:'group', 
    user: req.user,
    group,
  })
}

function newGroup(req, res){
  res.render('groups/new',{
    title:'Create a group',
    user: req.user,
  })
}

async function create(req,res){
  req.body.owner = req.user._id
  req.body.users = [req.user._id]
  // filter out empty form fields and disallow inviting yourself
  req.body.invites = req.body.invites.filter(e=>e.email && e.email !== req.user.email)
  try {
    const group = await Group.create(req.body)
    // send email invites
    for (let invite of group.invites){
      sendMail.invite(group, invite, req.user, req.body)
    }
    res.redirect('/groups/'+group._id)
  } catch (error) {
    console.log(error)
    res.redirect('/groups')
  }
}

async function deleteOne(req,res){
  await Group.deleteOne({ _id: req.params.id, owner: req.user._id} )
  res.redirect('/groups')
}

async function edit(req,res){
  const group = await Group.findById(req.params.id).populate('owner').populate('invites').populate('giftLists.user').exec()
  res.render('groups/edit',{
    title:'group', 
    user: req.user,
    group,
  })
}

async function update(req, res){
  const group = await Group.findById(req.params.id)
  if (group.owner._id.equals(req.user._id)){
    group.name = req.body.name
    group.desc = req.body.desc
    await group.save()
  }
  res.redirect('/groups/'+req.params.id)
}

async function invite(req, res){
  let group = await Group.findById(req.params.id).populate('invites').populate('users')
  if (group.owner._id.equals(req.user._id)){
    // Remove any empty invites
    req.body.invites = req.body.invites.filter(e=>e.email)
    
    if (req.body.invites.length){

      // Indexing existing invites by email for easy lookup
      let invitesByEmail = {}
      group.invites.forEach(i => invitesByEmail[i.email] = i)

      // Indexing existing group members by email for easy lookup
      let membersByEmail = {}
      group.users.forEach(i => membersByEmail[i.email] = i)

      let sendInvitesTo = []

      for ( let i = 0; i < req.body.invites.length; i++ ){
        // Check if email is not in existing invites & not in existing members
        if ( !invitesByEmail[req.body.invites[i].email] && !membersByEmail[req.body.invites[i].email] ){
          // Add the email to invites
          group.invites.push(req.body.invites[i])
          sendInvitesTo.push(req.body.invites[i])
        }
        else if (invitesByEmail[req.body.invites[i].email]){
          // email is already in invites. Let's resend them the invite but not add a new invite.
          sendInvitesTo.push(req.body.invites[i])
        }
      }

      group = await group.save()

      // Refreshing invitesByEmail with new invites
      group.invites.forEach(i => invitesByEmail[i.email] = i)

      // Send emails
      for (let invite of sendInvitesTo){
        sendMail.invite(group, invitesByEmail[invite.email], req.user, req.body)
      }
    }
  }
  res.redirect('/groups/'+req.params.id)
}

