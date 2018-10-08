const QuestionModel = require('../models/question_model')
const AnswerModel = require('../models/answer_model')

module.exports = {
	getAll: (getAll = (req, res) => {
		QuestionModel.find()
			.populate('answers')
			.then(questions => res.json(questions))
			.catch(err => res.status(404).json({ status: err, message: message.err }))
	}),

	findOne: (findOne = (req, res) => {
		QuestionModel.findById(req.params.questionId)
			.populate('answers')
			.then(questions => {
				res.json(questions)
			})
			.catch(err => {
				if (err.kind === 'ObjectId') {
					return res.status(404).send({
						message: 'question not found with id' + req.params.questionId
					})
				}
				return res.status(500).send({
					message: 'Error retreiving question with id ' + req.params.questionId
				})
			})
	}),

	create: (create = (req, res) => {
		let qanswers = []

		let question = new QuestionModel({
			text: req.body.question
		})

		question.save()
		console.log('QUESTION ID', question.id)
		for (let i = 0; i < req.body.answers.length; i++) {
			const Answer = new AnswerModel({
				text: req.body.answers[i].text,
				number: req.body.answers[i].number,
				replies: 0,
				question: question.id
			})
			Answer.save()

			qanswers = qanswers.concat(Answer.id)
			question.answers = qanswers
		}
		QuestionModel.find()
			.populate('answers')
			.then(question => {
				res.json({
					status: 'POST success',
					message: 'Question created',
					question: question
				})
			})
			.catch(err => {
				res.status(500).send({ message: err.message })
				res.status(400).send({ message: err.message })
			})
	}),

	update: (update = (req, res) => {
		if (!req.body.text) {
			return res.status(400).send({
				message: "This can't be empty"
			})
		}

		QuestionModel.findByIdAndUpdate(
			req.params.questionId,
			{
				text: req.body.text
			},
			{ new: true }
		)
			.then(question => {
				if (!question) {
					return res.status(404).send({
						message: 'question not found'
					})
				}
				res.json({
					status: 'Update success',
					message: 'Question Updated',
					question: question
				})
			})
			.catch(err => {
				if (err.kind === 'ObjectId') {
					return res.status(404).send({
						message: 'question not found with id ' + req.params.questionId
					})
				}
				return res.status(500).send({
					message: 'Error retreiving question with id ' + req.params.questionId
				})
			})
	})
}
