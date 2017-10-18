import React from 'react'
import PropTypes from 'prop-types'
import ValidationMessage from './ValidationMessage'

const Input = props => {
  return (
    <div>
      <input
        id={props.id}
        type={props.type}
        {...props.input}
      />
      <ValidationMessage meta={props.meta} />
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string
}

export default Input
