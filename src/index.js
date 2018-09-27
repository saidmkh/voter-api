const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const UserRoute = require('./routes/users')
const QuestionRoute = require('./routes/questions')
const AnswerRoute = require('./routes/answers')

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(UserRoute, QuestionRoute, AnswerRoute)
app.use(express.static('public'))

app.use((req, res, next) => {
  res.status(404).send('404 Not found')
})

app.use((err, req, res, next) => {
  console.error(err.stack)

  res.send('We have problems')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.info(`Server started at ${PORT} port`))
