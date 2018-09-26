const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    min: 1,
    max: 250
  },
  answers_count: Number
})

module.exports = mongoose.model('Questions', QuestionSchema)
