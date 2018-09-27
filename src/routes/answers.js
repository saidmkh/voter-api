const express = require('express')

const router = express.Router()

const AnswerController = require('../controllers/answer')

router.get('/api/v1/answers/:answerId', AnswerController.getById)
router.post('/api/v1/answers/', AnswerController.create)
router.put('/api/v1/answers/:answerId', AnswerController.updateById)
router.delete('/api/v1/answers/:answerId', AnswerController.deleteById)

module.exports = router
