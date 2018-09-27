const express = require('express')

const router = express.Router()

const UserController = require('../controllers/user')

router.post('/api/v1/register', UserController.create)
router.post('/api/v1/authenticate', UserController.authenticate)

module.exports = router
