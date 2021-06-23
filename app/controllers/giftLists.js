const Group = require('../models/group')

module.exports = { create, update }

async function create(req,res){
  req.body.user = req.user._id
  console.log(req.body)
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

function update(req,res){
  res.send('update a gift list ')
}