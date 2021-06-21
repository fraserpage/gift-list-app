const Group = require('../models/group')
const GiftList = require('../models/giftList')

module.exports = { create, update, delete: deleteGift }


function create(){
  res.send('create gift')
}

function update(){
  res.send('update gift')
}

function deleteGift(){
  res.send('update gift')
}