import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from './form/Input'

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.logIn = this.logIn.bind(this)
  }

  logIn(form) {
    const { email, password } = form
    this.props.logIn(email, password)
      .then(() => {

      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.logIn)}>
        <h2>Log in</h2>
        <label htmlFor="email">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          component={Input}
        />
        <label htmlFor="password">Password</label>
        <Field
          id="password"
          name="password"
          type="password"
          component={Input}
        />
        <button
          id="logIn"
          type="submit"
        >
          Log in
        </button>
      </form>
    )
  }
}

LogIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Please enter your email address'
  }

  if (!values.password) {
    errors.password = 'Please enter a password'
  }

  return errors
}

export default reduxForm({
  form: 'logInForm',
  validate
})(LogIn)
