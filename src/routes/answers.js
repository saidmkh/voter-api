const express = require('express')

const router = express.Router()

router.get('/answers', (req, res) => {
  if (req.query.id) {
    res.send(`${req.query.id}`)
  } else {
    res.send('question route')
  }
})

module.exports = router
