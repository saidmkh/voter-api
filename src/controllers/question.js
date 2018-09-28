const QuestionModel = require('../models/question_model')
const AnswersModel = require('../models/answer_model')

module.exports = {
  getAll: function(req, res, next) {
    let questionList = []

    QuestionModel.find({}, function(err, questions) {
      if (err) next(err)
      else {
        for (let question of questions) {
          questionList.push({
            id: question._id,
            text: question.text,
            answers: question.answers
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

  create: function(req, res, next) {
    QuestionModel.create(
      { text: req.body.text, answers: answers._id },
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
  },

  updateById: function(req, res, next) {
    AnswersModel.findOne(req.params.answerId).then(answer => {
      QuestionModel.findByIdAndUpdate(
        req.params.questionId,
        {
          text: req.body.text,
          answer: answer._id
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
    })
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
  }
}
