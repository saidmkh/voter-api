const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AnswerSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		min: 1,
		max: 100
	},
	number: {
		type: Number,
		required: true
	},
	replies: {
		type: Number,
		required: true
	},
	question: {
		type: Schema.Types.ObjectId,
		ref: 'Questions'
	}
})

module.exports = mongoose.model('Answers', AnswerSchema)
