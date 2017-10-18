import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logIn, signUp } from '../actions/auth'
import Container from './Container'
import Dashboard from './Dashboard'
import LogIn from './LogIn'
import SignUp from './SignUp'

class Home extends Component {
  render() {
    if (this.props.currentUser) {
      return (
        <Dashboard history={this.props.history} />
      )
    }
    return (
      <Container>
        <h1>Wanna know why you're broke?</h1>
        <LogIn logIn={this.props.actions.logIn} history={this.props.history} />
        <SignUp signUp={this.props.actions.signUp} history={this.props.history} />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logIn,
      signUp
    }, dispatch) }
}

Home.defaultProps = {
  currentUser: undefined
}

Home.propTypes = {
  actions: PropTypes.shape({
    logIn: PropTypes.func,
    signUp: PropTypes.func
  }).isRequired,
  currentUser: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
