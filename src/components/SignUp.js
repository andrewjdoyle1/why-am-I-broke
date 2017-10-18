import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from './form/Input'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.signUp = this.signUp.bind(this)
  }

  signUp(form) {
    const { email, firstName, lastName, password } = form
    this.props.signUp({
      email,
      firstName,
      lastName,
      password
    })
      .then(() => {
        this.props.history.push('/dashboard')
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.signUp)}>
        <h2>Sign up</h2>
        <label htmlFor="email">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          component={Input}
        />
        <label htmlFor="firstName">First Name</label>
        <Field
          id="firstName"
          name="firstName"
          type="text"
          component={Input}
        />
        <label htmlFor="surname">Last Name</label>
        <Field
          id="surname"
          name="lastName"
          type="text"
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
          id="SignUp"
          type="submit"
        >
          Sign up
        </button>
      </form>
    )
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Please add your email address'
  }

  if (values.email) {
    /* eslint-disable */
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    /* eslint-enable */
    errors.email = (!re.test(values.email)) && 'Please enter a valid email address'
  }

  if (!values.password) {
    errors.password = 'Please enter a password'
  }

  return errors
}

export default reduxForm({
  form: 'SignUpForm',
  validate
})(SignUp)
