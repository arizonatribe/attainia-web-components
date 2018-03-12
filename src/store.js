import {createBrowserHistory} from 'history'
import {mergeDeepLeft} from 'ramda'
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import {compose, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {createApolloFetch} from 'apollo-fetch'

import {apolloAuthMiddleWare} from './components/auth/middleware'
import initialState from './initialState'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || 'http://localhost/graphql'
export const OPENAPI_URL = process.env.REACT_APP_OPENAPI_URL || 'http://localhost'

export const apolloFetch = createApolloFetch({uri: GRAPHQL_URL})

const browserHistory = createBrowserHistory()

const store = createStore(
    reducers,
    mergeDeepLeft({auth: {baseUrl: process.env.REACT_APP_AUTH_BASE_URL}}, initialState),
    composeEnhancers(
        applyMiddleware(
            apolloAuthMiddleWare(apolloFetch),
            routerMiddleware(browserHistory),
            logger
        )
    )
)

export const history = syncHistoryWithStore(browserHistory, store)

export default store
