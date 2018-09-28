const QuestionModel = require('../models/question_model')
const AnswerModel = require('../models/answer_model')

module.exports = {
  getAll: function(req, res, next) {
    QuestionModel.find()
      .populate('answers')
      .then(questions => res.json(questions))
      .catch(err => res.status(404).json({ status: err, message: message.err }))
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
    QuestionModel.create({ text: req.body.text }, function(err, result) {
      if (err) next(err)
      else {
        res.json({
          status: 'success',
          message: 'question created',
          data: null
        })
      }
    })
  },

  updateById: function(req, res, next) {
    AnswerModel.findOne(req.params.answerId).then(answer => {
      QuestionModel.findByIdAndUpdate(
        req.params.questionId,
        {
          text: req.body.text,
          answers: answer._id
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
