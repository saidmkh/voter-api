const express = require('express')

const router = express.Router()

const QuestionController = require('../controllers/question')

router.get('/', QuestionController.getAll)
router.get('/:questionId', QuestionController.getById)
router.post('/', QuestionController.create)
router.put('/:questionId', QuestionController.updateById)
router.delete('/:questionId', QuestionController.deleteById)

module.exports = router
