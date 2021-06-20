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
  note: String,
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  gifts: [giftSchema]
}, 
{
  timestamps: true
})

module.exports = mongoose.model('GiftList', giftListSchema)