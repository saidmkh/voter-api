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
          verify_code: Math.floor(
            Math.random() * (999999999999 - 100000000000) + 100000000000
          ),
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
                  console.log(
                    'verify code = \n',
                    `http://localhost:3000/verify-email?=${user.email}?=${
                      user.verify_code
                    }`
                  )
                  res.json(user)
                })
              }
            })
          }
        })
      }
    })
  }),

  verify_email: (verify_email = (req, res) => {
    const email = req.body.email
    const verify_code = req.body.verify_code

    UserModel.findOne({ email })
      .then(user => {
        if (!user) {
          json.send({
            status: err,
            message: err.message
          })
        }
        if (user.verify_code === verify_code) {
          user.confirmed = true
          user.save()
          const payload = {
            id: user.id,
            email: user.email
          }
          jwt.sign(
            payload,
            'votesApi',
            {
              expiresIn: '168h'
            },
            (err, token) => {
              if (err) console.error('Error with Token', err)
              else {
                res.json({
                  success: true,
                  token: `Token --- ${token}`,
                  data: user
                })
              }
            }
          )
        } else {
          res.json({
            status: 'Error',
            message: 'Verify code not match'
          })
        }
      })
      .catch(err => {
        console.error(err)
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
      if (user.confirmed === false) {
        res.json({
          status: 'error',
          message: 'verify your email'
        })
        console.log(
          'verify you email please, \n',
          `http://localhost:3000/verify-email?=${user.email}?=${
            user.verify_code
          }`
        )
      } else {
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
                expiresIn: '168h'
              },
              (err, token) => {
                if (err) console.error('Error with Token', err)
                else {
                  res.json({
                    success: true,
                    token: `Token --- ${token}`,
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
      }
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
