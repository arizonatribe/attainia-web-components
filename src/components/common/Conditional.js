import {isNil, equals, isEmpty, T, cond, always, path} from 'ramda'
import uuid from 'uuid/v4'
import React from 'react'
import PropTypes from 'prop-types'

const isTrue = cond([
  [isNil, always(false)],
  [equals(0), always(false)],
  [equals(false), always(false)],
  [isEmpty, always(false)],
  [T, always(true)]
])

const getDisplayName = (comp) => {
  const displayName = path(['prototype', 'constructor', 'displayName'], comp)

  return displayName ? `${displayName}_Wrapper` : `ConditionalRenderingComponent-${uuid()}`
}

const Conditional = ({condition, children}) =>
  (isTrue(condition) ? children : null)

Conditional.propTypes = {
  children: PropTypes.node,
  condition: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string
  ])
}

Conditional.defaultProps = {
  condition: true,
  children: null
}

const renderConditional = (WrappedComponent) => {
  const ConditionalWrapper = props => (
    isTrue(props.condition) ? <WrappedComponent {...props} /> : null
  )

  ConditionalWrapper.displayName = getDisplayName(WrappedComponent)

  ConditionalWrapper.propTypes = {
    condition: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string
    ])
  }

  ConditionalWrapper.defaultProps = {
    condition: true
  }

  return ConditionalWrapper
}

export {
  Conditional,
  renderConditional
}
