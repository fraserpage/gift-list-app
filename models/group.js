const mongoose = require('mongoose')
const Schema = mongoose.Schema

const giftSchema = new Schema({
  name: String,
  note: String,
  link: String,
  claimedBy: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
}, 
{
  timestamps: true
})

const giftListSchema = new Schema({
  desc: String,
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  gifts: [giftSchema]
}, 
{
  timestamps: true
})

const inviteSchema = new Schema({
  email: String
})

const groupSchema = new Schema({
  name: String,
  desc: String,
  owner: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  invites: [inviteSchema],
  users: [{
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }],
  giftLists: [giftListSchema],
}, 
{
  timestamps: true
})

module.exports = mongoose.model('Group',groupSchema)