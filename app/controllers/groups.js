const Group = require('../models/group')
const GiftList = require('../models/giftList')

module.exports = { index, show, new: newGroup, create, update }

function index(req,res){
  res.render('groups/index',{
    title:'groups', 
    user: req.user,
    groups: Group.find({})
  })
}

function show(req,res){
  res.send('group show page')
}

function newGroup(){
  res.send('new group form')
}

function create(){
  res.send('create a new group')
}

function update(){
  res.send('update a group')
}