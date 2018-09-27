const express = require('express')

const router = express.Router()

router.get('/api/v1/questions', (req, res) => {
  if (req.query.id) {
    res.send(`${req.query.id}`)
  } else {
    res.send('GET questions')
  }
})

router.get('/api/v1/questions/:id', (req, res) => {
  res.send(`question ${req.params.id}`)
})

router.post('/api/v1/questions', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing')
  } else {
    res.send('POST question')
  }
})

module.exports = router
