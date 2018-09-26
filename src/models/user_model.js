const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  hash: String,
  photo: String,
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ]
})

UserSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds)
  next()
})

module.exports = mongoose.model('User', UserSchema)
