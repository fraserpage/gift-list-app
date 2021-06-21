const Group = require('../models/group')
const GiftList = require('../models/giftList')

module.exports = { create, update }

function create(req,res){
  res.send('create a new gift list for a user if they do not have one')
}

function update(req,res){
  res.send('update a gift list ')
}