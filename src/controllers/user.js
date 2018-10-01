const UserModel = require('../models/user_model')
const AnswerModel = require('../models/answer_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

module.exports = {
  create: (create = (req, res) => {
    UserModel.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        return res.status(400).json({
          email: 'Email already exists'
        })
      } else {
        const User = new UserModel({
          email: req.body.email,
          password: req.body.password,
          verify_code: req.body.verify_code,
          confirmed: false
        })

        bcrypt.genSalt(12, (err, salt) => {
          if (err) console.error('Error --- ', err)
          else {
            bcrypt.hash(User.password, salt, (err, hash) => {
              if (err) console.error('Error --- ', err)
              else {
                User.password = hash
                User.save().then(user => {
                  res.json(user)
                })
              }
            })
          }
        })
      }
    })
  }),

  authenticate: (authenticate = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    UserModel.findOne({ email }).then(user => {
      if (!user) {
        json.send({
          status: err,
          message: err.message
        })
      }
      bcrypt.compare(password, user.password).then(Found => {
        if (Found) {
          const payload = {
            id: user.id,
            email: user.email
          }
          jwt.sign(
            payload,
            'votesApi',
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) console.error('Error with Token', err)
              else {
                res.json({
                  success: true,
                  token: `Token ${token}`,
                  data: user
                })
              }
            }
          )
        } else {
          errors.password = 'Incorrect Password'
          return res.status(400).json(errors)
        }
      })
    })
  }),

  getUser: (getUser = (req, res) => {
    return res.json({
      id: req.user.id,
      email: req.user.email
    })
  }),

  updateAnswerById: (passport.authenticate('jwt', { session: false }),
  (updateAnswerById = (req, res, next) => {
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
  }))
}
