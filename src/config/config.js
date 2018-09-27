const mongoose = require('mongoose')

const data = 'mongodb://localhost/votes_data'

mongoose.connect(data)
mongoose.Promise = global.Promise

module.exports = mongoose
