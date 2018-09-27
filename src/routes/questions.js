const express = require('express')

const router = express.Router()

const QuestionController = require('../controllers/question')

router.get('/api/v1/questions/', QuestionController.getAll)
router.get('/api/v1/questions/:questionId', QuestionController.getById)
router.post('/api/v1/questions/', QuestionController.create)
router.put('/api/v1/questions/:questionId', QuestionController.updateById)
router.delete('/api/v1/questions/:questionId', QuestionController.deleteById)

module.exports = router
