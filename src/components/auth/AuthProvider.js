import React from 'react'
import {pick} from 'ramda'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ApolloProvider} from 'react-apollo'
import {withTheme} from 'styled-components'

import apolloClient from './apollo.client'

const createClient = props =>
    props.ownClient({
        ...pick(['baseUrl', 'storageType', 'useSubscriptions'], props)
    })

const AuthProvider = props =>
    <ApolloProvider client={createClient(props)} {...props}>
        {props.children}
    </ApolloProvider>

AuthProvider.propTypes = {
    apolloClientProps: PropTypes.shape({
        connectToDevTools: PropTypes.bool
    }),
    baseUrl: PropTypes.string,
    children: PropTypes.node,
    ownClient: PropTypes.func.isRequired,
    storageType: PropTypes.oneOf(['local', 'session', 'none']),
    useSubscriptions: PropTypes.bool.isRequired
}

AuthProvider.defaultProps = {
    storageType: 'local',
    ownClient: apolloClient,
    useSubscriptions: false
}

export default connect(
    store => ({urlFromStore: store.auth.baseUrl}),
    null,
    (storeProps, _, ownProps) => ({
        ...ownProps,
        baseUrl: ownProps.baseUrl || storeProps.urlFromStore
    })
)(withTheme(AuthProvider))
