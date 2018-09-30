const express = require('express')

const router = express.Router()

const QuestionController = require('../controllers/question')

router.get('/', QuestionController.getAll)
router.get('/:questionId', QuestionController.findOne)
router.post('/', QuestionController.create)
router.put('/:questionId', QuestionController.update)

module.exports = router
