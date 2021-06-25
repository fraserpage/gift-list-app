const Group = require('../models/group')
const sendMail = require('../mail/sendMail')

module.exports = { 
  index, 
  show, 
  new: newGroup, 
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
  // filter out empty form fields
  req.body.invites = req.body.invites.filter(e=>e.email)
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
  if (req.body.name) group.name = req.body.name
  if (req.body.desc) group.desc = req.body.desc
  await group.save()
  res.redirect('/groups/'+req.params.id)
}

async function invite(req, res){
  let group = await Group.findById(req.params.id)
  req.body.invites = req.body.invites.filter(e=>e.email)
  if (req.body.invites.length){
    group.invites.push(...req.body.invites)
    group = await group.save()
    console.log(group)
    for (let invite of req.body.invites){
      let inviteObj = group.invites.find(i=>i.email === invite.email)
      sendMail.invite(group, inviteObj, req.user, req.body)
    }
  }
  res.redirect('/groups/'+req.params.id)
}

