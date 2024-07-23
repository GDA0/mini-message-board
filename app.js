const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const engine = require('ejs-mate')
const mongoose = require('mongoose')
require('dotenv').config()
const Message = require('./models/message')

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    initializeDefaultMessages()
  })
  .catch((err) => console.error('MongoDB connection error:', err))

function getRandomDate (start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

const startDate = new Date(2024, 0, 1)
const endDate = new Date()

const defaultMessages = [
  {
    user: 'Rick',
    text: 'Wubba lubba dub dub!',
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Morty',
    text: 'Aw, jeez, Rick.',
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Rick',
    text: 'I turned myself into a pickle, Morty!',
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Morty',
    text: "Nobody exists on purpose, nobody belongs anywhere, everybody's gonna die. Come watch TV?",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Rick',
    text: "I'm sorry, but your opinion means very little to me.",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Morty',
    text: "That's planning for failure, Morty. Even dumber than regular planning.",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Rick',
    text: "You're young, you have your whole life ahead of you, and your anal cavity is still taut yet malleable.",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Morty',
    text: "Get your shit together. Get it all together and put it in a backpack, all your shit, so it's together.",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Rick',
    text: "I'm not looking for judgement, just a yes or no. Can you assimilate a giraffe?",
    added: getRandomDate(startDate, endDate)
  },
  {
    user: 'Morty',
    text: "I just want to go back to hell, where everyone thinks I'm smart and funny.",
    added: getRandomDate(startDate, endDate)
  }
]

async function initializeDefaultMessages () {
  try {
    const messageCount = await Message.countDocuments()
    if (messageCount === 0) {
      await Message.insertMany(defaultMessages)
      console.log('Default messages inserted')
    }
  } catch (error) {
    console.error('Error inserting default messages:', error)
  }
}

const indexRouter = require('./routes/index')
const newRouter = require('./routes/new')

const app = express()

// view engine setup
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/new', newRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
