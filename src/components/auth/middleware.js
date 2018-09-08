/**
 * Redux middleware for adding a bearer token to service request headers.
 * https://redux.js.org/docs/advanced/Middleware.html
 */

import {camelKeys, isPlainObj} from 'attasist'
import {
  anyPass,
  assocPath,
  compose,
  contains,
  converge,
  curry,
  identity,
  is,
  keys,
  merge,
  omit,
  path,
  pathSatisfies,
  pipe,
  prop,
  when
} from 'ramda'

import authDux from './ducks'

const {types: {VALIDATED_TOKEN, LOGIN, LOGOUT, UPDATED_TOKEN}} = authDux

export const metaDefaults = {
  page: 1,
  totalPages: 1,
  pageSize: 50,
  totalResults: 0
}

/**
 * Reformats an object's keys from underscore_separated names to camelCasesed names.
 *
 * @func
 * @sig {k: v} -> {k: v}
 * @param {Object} obj An object whose keys are (potentially) separated by underscores
 * @returns {Object} An object whose keys have been changed from underscore_separated to camelcased
 */
const renameKeys = compose(merge(metaDefaults), camelKeys)

/**
 * Conditionally formats a "meta" object, which (if available) is nested inside of a response object's "data" prop.
 *
 * @func
 * @sig {k: v} -> {k: v}
 * @param {Object} obj A response object which may or may not contain a "meta" object at the object's "data" prop.
 * @returns {Object} The original response object, but whose "data.meta" prop has been reformatted
 */
const formatMeta = when(
  path(['data', 'meta']),
  converge(assocPath(['data', 'meta']), [
    compose(renameKeys, path(['data', 'meta'])),
    identity
  ])
)

export const setAxiosClientToken = curry(
  (ax, token) => {
    if (ax.setHeader) {
      ax.setHeader('Authorization', `Bearer ${token}`)
      ax.addResponseTransform(formatMeta)
    } else if (path(['interceptors', 'request', 'use'])(ax)) {
      ax.interceptors.request.use(config => ({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      }))
    }
    return ax
  }
)

export const removeAxiosClientToken = (ax) => {
  if (ax.setHeader) {
    // eslint-disable-next-line no-param-reassign
    delete ax.headers.Authorization
  } else if (path(['interceptors', 'request', 'use'])(ax)) {
    ax.interceptors.request.use(config => ({
      ...config,
      headers: omit(['Authorization'])(config.headers)
    }))
  }
  return ax
}

export const setApolloClientToken = curry(
  (apolloFetch, token) => {
    apolloFetch.use(({options = {}}, fetchNext) => {
      // eslint-disable-next-line no-param-reassign
      options.headers = {
        ...(options.headers || {}),
        authorization: `Bearer ${token}`
      }
      fetchNext()
    })
    return apolloFetch
  }
)

export const removeApolloClientToken = (apolloFetch) => {
  apolloFetch.use(({options = {}}, fetchNext) => {
    // eslint-disable-next-line no-param-reassign
    options.headers = omit(['authorization'])(options.headers || {})
    fetchNext()
  })
  return apolloFetch
}

/**
 * Sets up the service client with headers and response transforms.
 *
 * Assume a service client with a .setHeaders api similar to apisauce.
 * https://github.com/infinitered/apisauce#changing-headers
 *
 * Assume a service client with a .addResponseTransform api similar to apisauce.
 * https://github.com/infinitered/apisauce#response-transforms
 *
 * @func
 * @sig a -> {k: v} -> ({k: v} -> {k: v}) -> {k: v} -> undefined
 */
export const serviceAuthMiddleware = service => () => next => action => {
  if ([VALIDATED_TOKEN, LOGIN, UPDATED_TOKEN].includes(action.type)) {
    setAxiosClientToken(service, path(['user', 'token', 'access_token'], action) || prop('token', action))
  } else if (LOGOUT === action.type) {
    removeAxiosClientToken(service)
  }
  next(action)
}

/**
 * Sets up the apollo client link with auth headers.
 *
 * Assume an apollo client with an apollo-http-link is passed in.
 * https://www.apollographql.com/docs/link/links/http.html
 *
 * In our link composition, we create a middleware link and place it
 * before calling any other links. Eventually the last link typically makes
 * the network call.
 * https://www.apollographql.com/docs/link/overview.html
 *
 * @func
 * @sig a -> {k: v} -> ({k: v} -> {k: v}) -> {k: v} -> undefined
 */
export const apolloAuthMiddleWare = apolloFetch => () => next => action => {
  if ([VALIDATED_TOKEN, LOGIN, UPDATED_TOKEN].includes(action.type)) {
    setApolloClientToken(apolloFetch, (
      path(['user', 'token', 'access_token'], action) || prop('token', action)
    ))
  } else if (LOGOUT === action.type) {
    removeApolloClientToken(apolloFetch)
  }
  next(action)
}

/**
 * Adds the token from localStorage OR from the Redux store to the action's meta.
 *
 * @func
 * @sig {k: v} -> {k: v} -> ({k: v} -> {k: v}) -> {k: v} -> {k: v}
 * @param {Object} tokenSource An object that contains either a Redux selector
 * OR a key name for localStorage to use when it invokes getItem()
 * @param {Object} store The instance of the root Redux store
 * @param {Function} next The Redux next() middleware function that moves the
 * flow forward when you're finished
 * @param {Object} action The originally dispatched Redux action
 * @returns {Object} The dispatched action, potentially with a meta.token value set
 */
export const addTokenToMeta = ({selector, localStorageKey = 'token'}) => ({getState}) => next => action => {
  if (pathSatisfies(isPlainObj, ['meta'])) {
    if (anyPass([
      pipe(prop('meta'), keys, contains('token')),
      path(['meta', 'worker']),
      path(['meta', 'effect'])
    ])(action)) {
      let token
      if (is(Function, selector)) {
        token = selector(getState())
      } else if (localStorageKey) {
        token = localStorage.getItem(localStorageKey)
      }
      if (token) {
        if (pathSatisfies(isPlainObj, ['meta', 'effect'])(action)) {
          return next(assocPath(['meta', 'effect', 'headers', 'authorization'], `Bearer ${token}`, action))
        }
        return next(assocPath(['meta', 'token'], token, action))
      }
    }
  }
  return next(action)
}
