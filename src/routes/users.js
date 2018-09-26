const express = require('express')

let router = express.Router()

router.get('/users', (req, res) => {
  res.send('users route')
})

router.get('/users/:id', (req, res) => {
  res.send(`users id #${req.params.id}`)
})

module.exports = router
