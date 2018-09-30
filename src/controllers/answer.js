const AnswerModel = require('../models/answer_model')
const QuestionModel = require('../models/question_model')

module.exports = {
	findOne: (findOne = (req, res) => {
		AnswerModel.findById(req.params.answerId)
			.then(answer => {
				if (!answer) {
					return res.status(404).send({ message: 'answer not found' })
				}
			})
			.catch(err => {
				if (err.kind === 'ObjectId') {
					return res.status(404).send({
						message: 'answer not found with id' + req.params.answerId
					})
				}
				return res.status(500).send({
					message: 'Error retreiving question with id ' + req.params.answerId
				})
			})
	}),

	create: (create = (req, res) => {
		if (!req.body.text || !req.body.number || !req.body.question) {
			return res.status(400).send({
				message: "This can't be empty"
			})
		}

		QuestionModel.findById(req.params.questionId).then(question => {
			const answer = new AnswerModel({
				text: req.body.text,
				number: req.body.number,
				replies: req.body.replies,
				question: questionId
			})
				.save()
				.then(answer => {
					question.answers.push(answer)
					question.save().then(question => {
						res.json({
							status: 'POST success',
							message: 'answer created'
						})
					})
				})
				.catch(err => {
					res.status(500).send({ message: err.message })
				})
		})
	}),

	update: (update = (req, res) => {
		if (!req.body.text || !req.body.number || !req.body.question) {
			return res.status(400).send({
				message: "This can't be empty"
			})
		}

		AnswerModel.findByIdAndUpdate(
			req.params.answerId,
			{
				text: req.body.text,
				number: req.body.number,
				replies: req.body.replies
			},
			{ new: true }
		)
			.then(answer => {
				if (!answer) {
					return res.status(404).send({
						message: 'answer not found'
					})
				}
				res.json({
					status: 'Update success',
					message: 'answer Updated',
					answer: answer
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
	}),

	delete: (deleteById = (req, res) => {
		AnswerModel.findByIdAndRemove(req.params.answerId)
			.then(answer => {
				if (!answer) {
					return res.status(404).send({
						message: 'Answer not found with id' + req.params.answerId
					})
				}

				res.json({
					status: 'Delete success',
					message: 'answer deleted'
				})
			})
			.catch(err => {
				if (err.kind === 'ObjectId' || err.name === 'NotFound') {
					return res.status(404).send({
						message: 'Answer not found with id ' + req.params.answerId
					})
				}
				return res.status(500).send({
					message: 'Could not delete not with id ' + req.params.answerId
				})
			})
	})
}
