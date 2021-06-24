const Group = require('../models/group')
const sendMail = require('../mail/sendMail')

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
  const group = await Group.findById(req.params.id).populate('owner').populate('invites').populate('giftLists.user').exec()
  res.render('groups/show',{
    title:'group', 
    user: req.user,
    group,
  })
}

function newGroup(){
  res.send('new group form... currently showing the new form on the index page')
}

async function create(req,res){
  req.body.owner = req.user._id
  req.body.users = [req.user._id]
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

async function update(req, res){
  const group = await Group.findById(req.params.id)
  if (req.name) group.name = req.name
  if (req.desc) group.desc = req.desc

}

