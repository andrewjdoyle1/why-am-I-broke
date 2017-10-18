import React from 'react'
import PropTypes from 'prop-types'

const Container = props => {
  return (
    <div className="container">
      {props.children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export default Container
