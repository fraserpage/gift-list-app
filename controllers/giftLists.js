const Group = require('../models/group')

module.exports = { create, update }

async function create(req,res){
  req.body.user = req.user._id
  try{
    let group = await Group.findById(req.params.id)
    group.giftLists.push(req.body)
    await group.save()
    res.redirect('/groups/'+req.params.id)
  }
  catch(err){
    console.log(err)
  }
}

async function update(req,res){
  const group = await Group.findById(req.params.id)
  const list = group.giftLists.id(req.params.listId)
  if (list.user._id.equals(req.user._id)){
    list.desc = req.body.desc
    await group.save()
  }
  res.redirect('/groups/'+req.params.id)
}