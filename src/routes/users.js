const express = require('express')
const passport = require('passport')
const passport_jwt = require('passport-jwt')

const router = express.Router()

const UserController = require('../controllers/user')

router.post('/register', UserController.create)
router.post('/authenticate', UserController.authenticate)
router.post('/:userId/answer/:answerId', UserController.updateAnswerById)
router.post('/:me', getUser, passport.authenticate('jwt', { session: false }))

module.exports = router
