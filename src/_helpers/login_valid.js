const checkInputEmpty = require('./input_valid')

module.exports = function loginValid(data) {
	const email_regex = /\S+@\S+\.\S+/
	let errors = {}
	data.email = !checkInputEmpty(data.email) ? data.email : ''
	data.password = !checkInputEmpty(data.password) ? data.password : ''

	if (data.email.lenth < 3) {
		errors.email = 'email cant be empty'
	}

	//if (!data.email.match(email_regex)) {
	// errors.email = 'email is not valid'
	//}

	return {
		errors,
		validate: checkInputEmpty(errors)
	}
}
