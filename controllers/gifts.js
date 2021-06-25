const Group = require('../models/group')

module.exports = { 
  create, 
  update, 
  claim,
  delete: deleteGift 
}

async function create(req,res){
  const group = await Group.findById(req.params.id)
  const list = group.giftLists.id(req.params.listId)
  list.gifts.push(...req.body.gifts)
  await group.save()
  res.redirect('/groups/'+req.params.id)
}

function update(req,res){
  res.send('update gift')
}

async function claim(req,res){
  const group = await Group.findById(req.params.id)
  const list = group.giftLists.id(req.params.listId)
  const gift = list.gifts.id(req.params.giftId)
  gift.claimedBy = req.user._id
  await group.save()
  res.redirect('/groups/'+req.params.id)
}

function deleteGift(req,res){
  res.send('update gift')
}