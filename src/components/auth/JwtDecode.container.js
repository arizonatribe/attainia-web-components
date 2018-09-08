import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import jwtDecode from 'jwt-decode'

import {withStatics} from '../common/helpers'
import JwtDecode from './JwtDecode'
import ducks from './ducks'

const {selectors, creators: {decodedJwt}} = ducks
const mapStateToProps = state => ({jwt: selectors.storedToken(state)})
const mapDispatchToProps = {decodedJwt}
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps,
  async tryDecodeJwt(jwt) {
    try {
      const decoded = jwtDecode(jwt)
      if (decoded) {
        dispatchProps.decodedJwt(decoded)
      }
    } catch (e) {
      // not a Jwt, but un-comment if it's crucial that it SHOULD be a Jwt
      // and import/mapDispatchToProps the corresponding handleError creator
      // dispatchProps.handleError(e)
    }
  }
})

export const withJwtDecode = (DecoratedComponent) => {
  const WithJwtDecode = ({jwt, tryDecodeJwt, ...passThroughProps}) =>
    <JwtDecode {...{jwt, tryDecodeJwt}}>
      <DecoratedComponent {...passThroughProps} />
    </JwtDecode>

  WithJwtDecode.propTypes = {
    tryDecodeJwt: PropTypes.func.isRequired,
    jwt: PropTypes.string
  }

  return withStatics(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(WithJwtDecode),
    DecoratedComponent
  )
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(JwtDecode)
