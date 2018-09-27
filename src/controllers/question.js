const QuestionModel = require('../models/question_model')

module.exports = {
  getById: function(req, res, next) {
    console.log(req.body)
    QuestionModel.findById(req.params.questionId, function(err, questionInfo) {
      if (err) next(err)
      else {
        res.json({
          status: 'success',
          message: 'question found',
          data: { questions: questionInfo }
        })
      }
    })
  },

  getAll: function(req, res, next) {
    let questionList = []

    QuestionModel.find({}, function(err, questions) {
      if (err) next(err)
      else {
        for (let question of questions) {
          questionList.push({
            id: question._id,
            text: question.text,
            answers: question.answers_count
          })
        }
        res.json({
          status: 'success',
          message: 'question list found',
          data: { questions: questionList }
        })
      }
    })
  },

  updateById: function(req, res, next) {
    QuestionModel.findByIdAndUpdate(
      req.params.questionId,
      {
        text: req.body.text
      },
      function(err, result) {
        if (err) next(err)
        else {
          res.json({
            status: 'success',
            message: 'question updated',
            data: null
          })
        }
      }
    )
  },

  deleteById: function(req, res, next) {
    QuestionModel.findByIdAndDelete(req.params.questionId, function(
      err,
      result
    ) {
      if (err) next(err)
      else {
        res.json({
          status: 'success',
          message: 'question deleted',
          data: null
        })
      }
    })
  },

  create: function(req, res, next) {
    QuestionModel.create(
      { text: req.body.text, answers_count: req.body.answers_count },
      function(err, result) {
        if (err) next(err)
        else {
          res.json({
            status: 'success',
            message: 'question created',
            data: null
          })
        }
      }
    )
  }
}
