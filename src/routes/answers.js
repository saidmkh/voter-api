const express = require('express')

const router = express.Router()

const AnswerController = require('../controllers/answer')

router.get('/:answerId', AnswerController.getById)
router.post('/', AnswerController.create)
router.put('/:answerId', AnswerController.updateById)
router.delete('/:answerId', AnswerController.deleteById)

module.exports = router
