const Group = require('../models/group')
const GiftList = require('../models/giftList')

module.exports = { index, show, new: newGroup, create, update }

async function index(req,res){
    // find groups that the user is a member of
    const groups = await Group.find({ users: req.user._id })
    res.render('groups/index',{
      title:'groups', 
      user: req.user,
      groups,
    })
}

async function show(req,res){
  const group = await Group.findById(req.params.id)
  res.render('groups/show',{
    title:'group', 
    user: req.user,
    group,
  })
}

function newGroup(){
  res.send('new group form')
}

async function create(req,res){
  req.body.invites = req.body.invites.replace(/\s/g,'').split(",")
  req.body.owner = req.user._id
  req.body.users = [req.user._id]
  try {
    const group = await Group.create(req.body)
    res.redirect('/groups/'+group._id)

  } catch (error) {
    console.log(error)
    res.redirect('/groups')
  }
}

function update(){
  res.send('update a group')
}