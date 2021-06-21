const Group = require('../models/group')
const GiftList = require('../models/giftList')

module.exports = { index, show, new: newGroup, create, update }

async function index(req,res){
  if (req.user){
    // find groups that the user is a member of
    const groups = await Group.find({ users: req.user._id })
    res.render('groups/index',{
      title:'groups', 
      user: req.user,
      groups,
    })
  }
  else{
    res.redirect('/')
  }
}

function show(req,res){
  res.send('group show page')
}

function newGroup(){
  res.send('new group form')
}

async function create(req,res){
  req.body.invites = req.body.invites.replace(/\s/g,'').split(",")
  req.body.owner = req.user._id
  req.body.users = [req.user._id]
  try {
    let list =  await Group.create(req.body)
    res.redirect('/groups')

  } catch (error) {
    console.log(error)
    res.redirect('/groups')
  }
}

function update(){
  res.send('update a group')
}