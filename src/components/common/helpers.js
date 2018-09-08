import {path, pick, trim, compose, is, toString} from 'ramda'
import hoistStaticsToEnhancer from 'hoist-non-react-statics'

export const parseError = compose(
  trim,
  ([label, message]) => message || label,
  str => str.split(/error:/i),
  val => (is(String, val) ? val : toString(val)),
  err => (is(Object, err) ? err.message : err)
)

export const getProp = (propsPath = [], defaultValue = '') =>
  props => path(propsPath, props) || defaultValue

export const getThemeProp = (propsPath = [], defaultValue = '') =>
  props => path(['theme'].concat(propsPath), props) || defaultValue

export function getDisplayName(
  {displayName, name} = {},
  defaultDisplayName = 'Component'
) {
  return displayName || name || defaultDisplayName
}

export function setEnhancerStatics(
  EnhancerComponent,
  {propTypes, defaultProps, displayName} = {}
) {
  Object.assign(EnhancerComponent, {
    defaultProps,
    displayName,
    propTypes
  })

  return EnhancerComponent
}

export function withStatics(EnhancerComponent, WrappedComponent) {
  const displayName = `${getDisplayName(EnhancerComponent, 'EnhancerComponent')}(${
    WrappedComponent.wrapperDisplayName || getDisplayName(WrappedComponent, 'WrappedComponent')
  })`

  setEnhancerStatics(EnhancerComponent, {
    ...pick(['propTypes', 'defaultProps'], EnhancerComponent),
    displayName
  })

  return hoistStaticsToEnhancer(EnhancerComponent, WrappedComponent)
}
