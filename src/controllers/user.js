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
      AnswerModel.findById(req.params.answerId)
        .then(answer => {
          UserModel.findByIdAndUpdate(req.params.userId)
            .then(user => {
              user.answers.push(answer._id)
              res
                .json({
                  status: 'success',
                  message: 'user answer updated',
                  data: user
                })
                .catch(res.json({ message: message.err }))
            })
            .catch(res.json({ message: message.err }))
        })
        .catch(res.json({ message: message.err }))
    })
  })
}
