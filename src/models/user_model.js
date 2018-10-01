const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const saltRounds = 12

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  photo_url: {
    type: String,
    default: null
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'answers'
    }
  ],
  verify_code: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false,
    required: true
  }
})

UserSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds)
  next()
})

module.exports = mongoose.model('User', UserSchema)
