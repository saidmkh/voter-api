const express = require('express')

const router = express.Router()

const AnswerController = require('../controllers/answer')

router.get('/:answerId', AnswerController.findOne)
router.post('/', AnswerController.create)
router.put('/:answerId', AnswerController.update)
router.delete('/:answerId', AnswerController.delete)

module.exports = router
