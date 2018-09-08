import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose, withApollo} from 'react-apollo'

import {withStatics} from '../common/helpers'
import {VALIDATE_TOKEN} from './queries'
import {removeToken} from './helpers'
import Validator from './Validator'
import ducks from './ducks'

const {selectors, creators: {logout, handleError, validatedToken}} = ducks
const mapStateToProps = state => ({token: selectors.parsedToken(state)})
const mapDispatchToProps = {logout, handleError, validatedToken}
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  async tryValidateToken(token) {
    try {
      const {error, data} = await ownProps.client.query({
        query: VALIDATE_TOKEN,
        variables: {token}
      })
      if (error) {
        throw new Error(error)
      }
      if (!data.validateToken || !data.validateToken.active) {
        dispatchProps.logout(token)
        removeToken(token)
      } else {
        dispatchProps.validatedToken(token)
      }
    } catch (e) {
      dispatchProps.handleError(e)
    }
  }
})

const withReduxConnect = () => connect(mapStateToProps, mapDispatchToProps, mergeProps)

export const withTokenValidation = (DecoratedComponent) => {
  const WithTokenValidation = ({token, tryValidateToken, ...passThroughProps}) =>
    <Validator {...{token, tryValidateToken}}>
      <DecoratedComponent {...passThroughProps} />
    </Validator>

  WithTokenValidation.propTypes = {
    tryValidateToken: PropTypes.func,
    token: PropTypes.string
  }

  return withStatics(
    compose(withApollo, withReduxConnect())(WithTokenValidation),
    DecoratedComponent
  )
}

export default compose(withApollo, withReduxConnect())(Validator)
