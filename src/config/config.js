const mongoose = require('mongoose')

const data = 'mongodb://admin:admin1@ds161790.mlab.com:61790/votes_data'

mongoose.connect(data)
mongoose.Promise = global.Promise

module.exports = mongoose
