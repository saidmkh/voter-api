const UserModel = require('../models/user_model')
const QuestionModel = require('../models/question_model')
const AnswerModel = require('../models/answer_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const registerValid = require('../_helpers/register_valid')
const loginValid = require('../_helpers/login_valid')

module.exports = {
	create: (create = (req, res) => {
		const { errors, validate } = registerValid(req.body)

		if (!validate) {
			return res.status(400).json(errors)
		}
		UserModel.findOne({
			email: req.body.email
		}).then(user => {
			if (user) {
				return res.status(400).json({
					email: 'Email already exists'
				})
			} else if (req.body.repeat_password !== req.body.password) {
				return res.status(400).json({
					email: 'passwords didnt equals'
				})
			} else {
				const User = new UserModel({
					email: req.body.email,
					password: req.body.password,
					verify_code: Math.floor(
						Math.random() * (999999999999 - 100000000000) + 100000000000
					),
					confirmed: false
				})

				bcrypt.genSalt(12, (err, salt) => {
					if (err) console.error('Error --- ', err)
					else {
						bcrypt.hash(User.password, salt, (err, hash) => {
							if (err) console.error('Error --- ', err)
							else {
								User.password = hash
								User.save().then(user => {
									console.log(
										'verify code = \n',
										`http://localhost:3000/verify-email?=${user.email}?=${
											user.verify_code
										}`
									)
									res.json(user)
								})
							}
						})
					}
				})
			}
		})
	}),

	verify_email: (verify_email = (req, res) => {
		const email = req.body.email
		const verify_code = req.body.verify_code

		UserModel.findOne({ email })
			.then(user => {
				if (!user) {
					json.send({
						status: err,
						message: err.message
					})
				}
				if (user.verify_code === verify_code) {
					user.confirmed = true
					user.save()
					const payload = {
						id: user.id,
						email: user.email
					}
					jwt.sign(
						payload,
						'votesApi',
						{
							expiresIn: '168h'
						},
						(err, token) => {
							if (err) console.error('Error with Token', err)
							else {
								res.json({
									success: true,
									token: `Token --- ${token}`,
									data: user
								})
							}
						}
					)
				} else {
					res.json({
						status: 'Error',
						message: 'Verify code not match'
					})
				}
			})
			.catch(err => {
				console.error(err)
			})
	}),

	authenticate: (authenticate = (req, res) => {
		const { errors, validate } = loginValid(req.body)

		if (!validate) {
			return res.status(400).json(errors)
		}

		const email = req.body.email
		const password = req.body.password

		UserModel.findOne({ email }).then(user => {
			if (!user) {
				return res.status(400).json({
					email: 'Check your password or email again. You do this wrong'
				})
			}
			if (user.confirmed === false) {
				return res.status(400).json({
					email: 'Go to server console and verify your email'
				})
				console.log(
					'verify you email please, \n',
					`http://localhost:3000/verify-email?=${user.email}?=${
						user.verify_code
					}`
				)
			} else {
				bcrypt.compare(password, user.password).then(Found => {
					if (Found) {
						const payload = {
							id: user.id,
							email: user.email
						}
						jwt.sign(
							payload,
							'votesApi',
							{
								expiresIn: '168h'
							},
							(err, token) => {
								if (err) console.error('Error with Token', err)
								else {
									res.json({
										success: true,
										token: `Token --- ${token}`,
										data: user
									})
								}
							}
						)
					} else {
						errors.password = 'Incorrect Password'
						return res.status(400).json(errors)
					}
				})
			}
		})
	}),

	getUserAnswers: (getUserAnswers = (req, res) => {
		UserModel.findById(req.params.userId)
			.populate('answers')
			.then(user => {
				let questions = []
				for (let i = 0; i < user.answers.length; i++) {
					questions.push(user.answers[i].question)
				}
				res.json(questions)
			})
			.catch(err => res.status(404).json({ status: err, message: err.message }))
	}),

	updateAnswerById: (passport.authenticate('jwt', { session: false }),
	(updateAnswerById = (req, res, next) => {
		UserModel.findById(req.params.userId)
			.populate('answers')
			.then(user => {
				for (let i = 0; i < user.answers.length; i++) {
					if (user.answers[i].question == req.params.questionId) {
						return res.json({
							status: 'error',
							message: 'you already voted'
						})
					}
				}
				AnswerModel.findById(req.params.answerId)
					.update({
						$inc: { replies: 1 }
					})
					.then(answer => {
						answer.save()
					})
				UserModel.findById(req.params.userId)
					.update({ $push: { answers: req.params.answerId } })
					.then(answer => {
						if (!answer) {
							return res.status(404).send({
								message: 'answer not found'
							})
						}
						res.json({
							status: 'Update success',
							message: 'answer Updated'
						})
					})
					.catch(err => {
						if (err.kind === 'ObjectId') {
							return res.status(404).send({
								message: 'answer not found with id ' + req.params.answerId
							})
						}
						return res.status(500).send({
							message: 'Error retreiving answer with id ' + req.params.answerId
						})
					})
			})
	}))
}
