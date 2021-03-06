let checkInputEmpty = require('./input_valid')

module.exports = function registerValid(data) {
	const email_regex = /\S+@\S+\.\S+/
	let errors = {}
	data.email = !checkInputEmpty(data.email) ? data.email : ''
	data.password = !checkInputEmpty(data.password) ? data.password : ''
	data.repeat_password = !checkInputEmpty(data.repeat_password)
		? data.repeat_password
		: ''

	//if (data.email.match(email_regex)) {
	//  errors.email = 'email is not valid'
	//}

	if (data.password !== data.repeat_password) {
		errors.password = 'passwords didnt equals'
	}

	return {
		errors,
		validate: checkInputEmpty(errors)
	}
}
