import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Container from './Container'

const NavBar = () => {
  return (
    <Container>
      <div className="nav-bar">
        <Link to="/">Home</Link>
      </div>
    </Container>
  )
}

export default NavBar
