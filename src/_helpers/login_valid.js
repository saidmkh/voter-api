import checkInputEmpty from './input_valid'

module.exports = function loginValid(data) {
  const email_regex = /\S+@\S+\.\S+/
  let errors = {}
  data.email = !checkInputEmpty(data.email) ? data.email : ''
  data.password = !checkInputEmpty(data.password) ? data.password : ''
  data.password_confirm = !checkInputEmpty(data.password_confirm)
    ? data.password_confirm
    : ''

  if (data.email.lenth < 3) {
    errors.email = 'email cant be empty'
  }

  if (!data.email.match(email_regex)) {
    errors.email = 'email is not valid'
  }

  if (data.password.lenth < 5) {
    errors.password = 'password too short'
  }

  return {
    errors,
    validate: checkInputEmpty(errors)
  }
}
