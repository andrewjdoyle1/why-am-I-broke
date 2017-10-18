import React from 'react'
import PropTypes from 'prop-types'

const ValidationMessage = props => {
  return (
    <div>
      {((props.meta.invalid && props.meta.dirty) || props.meta.submitFailed) &&
      <span>{props.meta.error}</span>}
    </div>
  )
}

ValidationMessage.propTypes = {
  meta: PropTypes.shape({
    active: PropTypes.bool,
    invalid: PropTypes.bool,
    dirty: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.string
  })
}

export default ValidationMessage
