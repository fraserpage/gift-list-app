const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  giftLists: [{
    type: Schema.Types.ObjectId, 
    ref: 'GiftList'
  }],
}, 
{
  timestamps: true
})

module.exports = mongoose.model('Group',groupSchema)