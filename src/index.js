const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const UserRoute = require('./routes/users')
const QuestionRoute = require('./routes/questions')
const AnswerRoute = require('./routes/answers')
const mongoose = require('./config/config')

let jwt = require('jsonwebtoken')

const app = express()

app.set('secretKey', 'votesApi')

mongoose.connection.on(
  'error',
  console.error.bind(console, 'Mongo connection failed')
)

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/v1/', function(req, res) {
  res.json({ title: 'API' })
})

app.use('/api/v1/users/', UserRoute)

app.use('/api/v1/questions/', validateUser, QuestionRoute)
app.use('/api/v1/answers/', validateUser, AnswerRoute)

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(
    err,
    decoded
  ) {
    if (err) {
      res.json({ status: 'error', message: err.message, data: null })
    } else {
      req.body.userId = decoded.id
      next()
    }
  })
}

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

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.info(`Server started at ${PORT} port`))
