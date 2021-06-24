const mongoose = require('mongoose')
const Schema = mongoose.Schema

const giftSchema = new Schema({
  name: String,
  note: String,
  link: String,
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

const groupSchema = new Schema({
  name: String,
  desc: String,
  owner: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  invites: [String],
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