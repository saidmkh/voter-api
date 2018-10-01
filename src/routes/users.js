const express = require('express')

const router = express.Router()

const UserController = require('../controllers/user')

router.post('/register', UserController.create)
router.post('/authenticate', UserController.authenticate)
router.patch('/:userId/answer/:answerId', UserController.updateAnswerById)

module.exports = router
