import {path} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withApollo, compose} from 'react-apollo'

import {withStatics} from '../common/helpers'
import {GET_TOKEN_INFO} from './queries'
import TokenInfo from './TokenInfo'
import ducks from './ducks'

const {selectors, creators: {userInfoFromToken, handleError}} = ducks
const mapStateToProps = state => ({token: selectors.parsedToken(state)})
const mapDispatchToProps = {userInfoFromToken, handleError}
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  async tryGetTokenInfo(token) {
    try {
      const {error, data} = await ownProps.client.query({
        query: GET_TOKEN_INFO,
        variables: {token}
      })
      if (error) {
        throw new Error(error)
      }
      if (path(['getTokenInfo'], data)) {
        dispatchProps.userInfoFromToken(data.getTokenInfo)
      }
    } catch (e) {
      dispatchProps.handleError(e)
    }
  }
})

const withReduxConnect = () => connect(mapStateToProps, mapDispatchToProps, mergeProps)

export const withTokenInfo = (DecoratedComponent) => {
  const WithTokenInfo = ({token, tryGetTokenInfo, ...passThroughProps}) =>
    <TokenInfo {...{token, tryGetTokenInfo}}>
      <DecoratedComponent {...passThroughProps} />
    </TokenInfo>

  WithTokenInfo.propTypes = {
    tryGetTokenInfo: PropTypes.func,
    token: PropTypes.string
  }

  return withStatics(
    compose(withApollo, withReduxConnect())(WithTokenInfo),
    DecoratedComponent
  )
}

export default compose(withApollo, withReduxConnect())(TokenInfo)
