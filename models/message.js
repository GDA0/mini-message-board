const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  added: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
