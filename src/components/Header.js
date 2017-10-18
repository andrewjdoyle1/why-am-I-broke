import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOut } from '../actions/auth'
import Container from './Container'

class Header extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
  }

  logOut(event) {
    event.preventDefault()
    this.props.actions.logOut()
  }

  render() {
    return (
      <div className="app-header">
        <Container>
          <div>
            {this.props.currentUser &&
            <div className="app-header-user-name">
              {this.props.currentUser.firstName} <a href="" onClick={this.logOut}>Log out</a>
            </div>}
          </div>
        </Container>
      </div>
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
      logOut
    }, dispatch) }
}

Header.defaultProps = {
  currentUser: undefined
}

Header.propTypes = {
  actions: PropTypes.shape({
    logOut: PropTypes.func
  }).isRequired,
  currentUser: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
