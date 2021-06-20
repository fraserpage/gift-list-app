const Group = require('../models/group')

module.exports = { index, show, new: newGroup, create, update }

function index(req,res){
  res.send('group index. is this needed? should just be a dropdown?')
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