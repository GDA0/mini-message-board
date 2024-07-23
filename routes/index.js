const express = require('express')
const Message = require('../models/message')
const { formatDistanceToNow } = require('date-fns')

const router = express.Router()

function sortMessagesByDate (messages) {
  return messages.sort((a, b) => new Date(b.added) - new Date(a.added))
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  const messages = await Message.find()
  const sortedMessages = sortMessagesByDate(messages)
  res.render('index', {
    title: 'Messages',
    messages: sortedMessages,
    formatDistanceToNow
  })
})

router.get('/messages/:id', async (req, res, next) => {
  const messages = await Message.find()
  const message = messages.find((msg) => msg.id === req.params.id)
  if (message) {
    res.render('message', {
      message,
      title: 'Message detail',
      formatDistanceToNow
    })
  } else {
    res.status(404).send('Message not found')
  }
})

module.exports = router
