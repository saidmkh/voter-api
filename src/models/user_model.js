const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
      ref: 'Answers'
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

module.exports = mongoose.model('User', UserSchema)
