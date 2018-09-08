import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withApollo, compose} from 'react-apollo'

import {withStatics} from '../common/helpers'
import AuthStatus from './AuthStatus'
import IS_LOGGED_OUT from './subscriptions'
import ducks from './ducks'

const {selectors, creators: {handleError, logout}} = ducks
const mapStateToProps = state => ({token: selectors.token(state)})
const mapDispatchToProps = {handleError, logout}
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  startSubscription() {
    return ownProps.client.subscribe({
      query: IS_LOGGED_OUT,
      variables: {token: stateProps.token}
    }).subscribe({
      next({error, isLoggedOut}) {
        if (error) dispatchProps.handleError(error)
        if (isLoggedOut) dispatchProps.logout()
      },
      error(err) {
        return dispatchProps.handleError(err)
      }
    })
  }
})

const withReduxConnect = () => connect(mapStateToProps, mapDispatchToProps, mergeProps)

export const withAuthStatusSubscription = (DecoratedComponent) => {
  const WithAuthStatus = ({startSubscription, ...passThroughProps}) =>
    <AuthStatus startSubscription={startSubscription}>
      <DecoratedComponent {...passThroughProps} />
    </AuthStatus>

  WithAuthStatus.propTypes = {
    startSubscription: PropTypes.func
  }

  return withStatics(
    compose(withApollo, withReduxConnect())(WithAuthStatus),
    DecoratedComponent
  )
}

export default compose(withApollo, withReduxConnect())(AuthStatus)
