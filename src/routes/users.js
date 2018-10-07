const express = require('express')
const passport = require('passport')
const passport_jwt = require('passport-jwt')

const router = express.Router()

const UserController = require('../controllers/user')

router.post('/register', UserController.create)
router.post('/verify_email', UserController.verify_email)
router.post('/login', UserController.authenticate)
router.put(
	'/:userId/question/:questionId/answer/:answerId',
	UserController.updateAnswerById
)
router.get(
	'/:userId',
	UserController.getUserAnswers,
	passport.authenticate('jwt', { session: false })
)

module.exports = router
