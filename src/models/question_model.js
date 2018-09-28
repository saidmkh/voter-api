const mongoose = require('mongoose')

const Schema = mongoose.Schema

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    min: 1,
    max: 250
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answers'
    }
  ]
})

module.exports = mongoose.model('Questions', QuestionSchema)
