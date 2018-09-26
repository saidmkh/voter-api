const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
  text: {
    type: String,
    min: 1,
    max: 100
  },
  number: Number,
  replies: Number,
  question: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }
  ]
})

module.exports = mongoose.model('Answer', AnswerSchema)
