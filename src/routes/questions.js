const express = require('express')

const router = express.Router()

router.get('/questions', (req, res) => {
  if (req.query.id) {
    res.send(`${req.query.id}`)
  } else {
    res.send('question route')
  }
})

router.get('/questions/:id', (req, res) => {
  res.send(`question #${req.params.id}`)
})

router.post('/questions', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing')
  }

  let model = new QuestionModel(req.body)
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router
