const express = require('express')
const Message = require('../models/message')

const router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('form', { title: 'Add new message' })
})

router.post('/', async (req, res, next) => {
  const { user, text } = req.body
  const message = new Message({ user, text })
  await message.save()
  res.redirect('/')
})

module.exports = router
