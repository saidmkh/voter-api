const UserModel = require('../models/user_model')
const AnswerModel = require('../models/answer_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
	create: function(req, res, next) {
		UserModel.create(
			{
				email: req.body.email,
				password: req.body.password,
				verify_code: req.body.verify_code,
				confirmed: req.body.confirmed
			},
			function(err, result) {
				if (err) next(err)
				else {
					res.json({
						status: 'success',
						message: 'user added',
						data: null
					})
				}
			}
		)
	},

	authenticate: function(req, res, next) {
		UserModel.findOne({ email: req.body.email }, function(err, userInfo) {
			if (err) next(err)
			else {
				if (bcrypt.compareSync(req.body.password, userInfo.password)) {
					const token = jwt.sign(
						{ id: userInfo._id },
						req.app.get('secretKey'),
						{ expiresIn: '1h' }
					)
					res.json({
						status: 'success',
						message: 'user found',
						data: {
							userInfo,
							token: token
						}
					})
				} else {
					res.json({
						status: 'erroe',
						message: 'invalid email or password',
						data: null
					})
				}
			}
		})
	},

	updateAnswerById: function(req, res, next) {
		AnswerModel.findOne(req.params.answerId).then(answer => {
			UserModel.findByIdAndUpdate(
				req.params.userId,
				{
					answers: answerId
				},
				function(err, result) {
					if (err) next(err)
					else {
						answers.push(answers)
						res.json({
							status: 'success',
							message: 'user answer updated',
							data: null
						})
					}
				}
			)
		})
	}
}
