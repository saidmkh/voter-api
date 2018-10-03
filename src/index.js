const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const UserRoute = require('./routes/users')
const QuestionRoute = require('./routes/questions')
const AnswerRoute = require('./routes/answers')
const mongoose = require('./config/config')
const passport = require('passport')
const passport_jwt = require('passport-jwt')

let jwt = require('jsonwebtoken')

const app = express()

app.use(passport.initialize())
require('./_helpers/passport_conf')(passport)

app.set('secretKey', 'votesApi')

mongoose.connection.on(
  'error',
  console.error.bind(console, 'Mongo connection failed')
)

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/', function(req, res) {
  res.json({ title: 'API' })
})

app.use('/api/users/', UserRoute)

app.use('/api/questions/', QuestionRoute)
app.use(
  '/api/questions/',
  passport.authenticate('jwt', { session: false }),
  AnswerRoute
)

app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  console.log(err)

  if (err.status === 404) res.status(404).json({ message: 'Not found' })
  else res.status(500).json({ message: 'Something wrong ' })
})

app.use(express.static('public'))

const PORT = process.env.PORT || 7000
app.listen(PORT, () => console.info(`Server started at ${PORT} port`))
