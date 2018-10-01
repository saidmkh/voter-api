const express = require('express')

const router = express.Router()

const AnswerController = require('../controllers/answer')

router.get('/answers/:answerId', AnswerController.findOne)
router.post('/:questionId/answers', AnswerController.create)
router.put('/:questionId/answers/:answerId', AnswerController.update)
router.delete('/:questionId/answers/:answerId', AnswerController.delete)

module.exports = router
