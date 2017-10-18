/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import NavBar from './NavBar'
import Home from './Home'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {/*<NavBar />*/}
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
  store: PropTypes.object.isRequired
}

export default App
