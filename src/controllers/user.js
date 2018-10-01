const UserModel = require('../models/user_model')
const AnswerModel = require('../models/answer_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  create: (create = (req, res, next) => {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.verify_code ||
      !req.body.confirmed
    ) {
      return res.status(400).send({
        message: "This can't be empty"
      })
    }
    UserModel.create(
      {
        email: req.body.email,
        password: req.body.password,
        verify_code: req.body.verify_code,
        confirmed: req.body.confirmed
      },
      function(err, result) {
        if (err) next(err)
        else {
          res.json({
            status: 'success',
            message: 'user added',
            data: null
          })
        }
      }
    )
  }),

  authenticate: (authenticate = (req, res) => {
    UserModel.findOne({ email: req.body.email }, function(err, userInfo) {
      if (!req.body.email || !req.body.password) {
        return res.status(400).send({
          message: "This can't be empty"
        })
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get('secretKey'),
            { expiresIn: '1h' }
          )
          res.json({
            status: 'success',
            message: 'user found',
            data: {
              userInfo,
              token: token
            }
          })
        } else {
          res.json({
            status: 'erroe',
            message: 'invalid email or password',
            data: null
          })
        }
      }
    })
  }),

  updateAnswerById: (updateAnswerById = (req, res, next) => {
    UserModel.findById(req.params.userId).then(user => {
      AnswerModel.findById(req.params.answerId).then(answer => {
        UserModel.findByIdAndUpdate(req.params.userId, {
          answers: user.answers.concat(answer._id)
        })
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
      })
    })
  })
}
