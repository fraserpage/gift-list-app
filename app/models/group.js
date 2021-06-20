const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
  name: String,
  desc: String,
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