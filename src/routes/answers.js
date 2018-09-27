const express = require('express')

const router = express.Router()

router.get('/api/v1/answers', (req, res) => {
  if (req.query.id) {
    res.send(`${req.query.id}`)
  } else {
    res.send('GET answers')
  }
})

router.get('/api/v1/answers/:id', (req, res) => {
  res.send(`GET answer ${req.params.id}`)
})

router.post('/api/v1/answers/', (req, res) => {
  if (!req.body) {
    res.status(400).res.send('Request body is missing')
  } else {
    res.send('POST answer')
  }
})

module.exports = router
