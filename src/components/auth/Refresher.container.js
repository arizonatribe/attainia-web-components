import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withApollo, compose} from 'react-apollo'

import {withStatics} from '../common/helpers'
import {REFRESH_TOKEN} from './mutations'
import Refresher from './Refresher'
import {setToken} from './helpers'
import ducks from './ducks'

const {selectors, creators: {handleError, updatedToken, refresh}} = ducks
const mapStateToProps = state => ({
    token: selectors.token(state),
    refreshInMs: selectors.refreshInMs(state)
})
const mapDispatchToProps = {handleError, updatedToken, refresh}
const mergeProps = (storeProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...storeProps,
    queueNextRefresh({tryWriteTokenToStorage, tryRefresh, token, refreshInMs}) {
        dispatchProps.refresh(setTimeout(() => tryRefresh(token, tryWriteTokenToStorage), refreshInMs))
    },
    async tryRefresh(token, tryWriteTokenToStorage) {
        try {
            const {data: {error, refreshUser}} = await ownProps.client.mutate({
                mutation: REFRESH_TOKEN,
                variables: {token}
            })
            if (error) {
                throw new Error(error)
            }
            if (refreshUser) {
                dispatchProps.updatedToken(refreshUser)
                if (tryWriteTokenToStorage) {
                    tryWriteTokenToStorage(token)
                }
            }
        } catch (err) {
            dispatchProps.handleError(err)
        }
    }
})

const withReduxConnect = () => connect(mapStateToProps, mapDispatchToProps, mergeProps)

export const withTokenRefresh = (DecoratedComponent) => {
    const WithTokenRefresh = ({
        token,
        tryRefresh,
        queueNextRefresh,
        client,
        refreshInMs,
        tryWriteTokenToStorage,
        ...passThroughProps
    }) =>
        <Refresher {...{token, tryRefresh, tryWriteTokenToStorage, queueNextRefresh, client, refreshInMs}}>
            <DecoratedComponent {...passThroughProps} />
        </Refresher>

    WithTokenRefresh.propTypes = {
        queueNextRefresh: PropTypes.func,
        tryRefresh: PropTypes.func.isRequired,
        tryWriteTokenToStorage: PropTypes.func,
        refreshInMs: PropTypes.number,
        token: PropTypes.string,
        client: PropTypes.shape({
            query: PropTypes.func.isRequired
        }).isRequired
    }

    WithTokenRefresh.defaultProps = {
        tryWriteTokenToStorage: setToken
    }

    return withStatics(
        compose(withApollo, withReduxConnect())(WithTokenRefresh),
        DecoratedComponent
    )
}

export default compose(withApollo, withReduxConnect())(Refresher)
