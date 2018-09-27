const AnswerModel = require('../models/answer_model')

module.exports = {
  getById: function(req, res, next) {
    console.log(req.body)
    AnswerModel.findById(req.params.answerId, function(err, answerInfo) {
      if (err) next(err)
      else {
        res.json({
          status: 'success',
          message: 'answer found',
          data: { answers: answerInfo }
        })
      }
    })
  },

  create: function(req, res, next) {
    AnswerModel.create(
      {
        text: req.body.text,
        number: req.body.number,
        replies: req.body.replies,
        question: req.body.question
      },
      function(err, result) {
        if (err) next(err)
        else {
          res.json({
            status: 'success',
            message: 'answer created',
            data: null
          })
        }
      }
    )
  },

  updateById: function(req, res, next) {
    AnswerModel.findByIdAndUpdate(
      {
        text: req.body.text,
        number: req.body.number,
        replies: req.body.replies
      },
      function(err, result) {
        if (err) next(err)
        else {
          res.json({
            status: 'success',
            message: 'answer updated',
            data: null
          })
        }
      }
    )
  },

  deleteById: function(req, res, next) {
    AnswerModel.findByIdAndDelete(req.params.answerId, function(err, result) {
      if (err) next(err)
      else {
        res.json({
          status: 'success',
          message: 'answer deleted',
          data: null
        })
      }
    })
  }
}
