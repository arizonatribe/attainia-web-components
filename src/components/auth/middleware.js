/**
 * Redux middleware for adding a bearer token to service request headers.
 * https://redux.js.org/docs/advanced/Middleware.html
 */

import {
    adjust,
    assocPath,
    compose,
    converge,
    fromPairs,
    identity,
    invoker,
    last,
    map,
    merge,
    path,
    prop,
    propOr,
    toPairs,
    toUpper,
    when
} from 'ramda'

import authDux from './ducks'

const {types: {PARSED_TOKEN, LOGIN}} = authDux

export const metaDefaults = {
    page: 1,
    totalPages: 1,
    pageSize: 50,
    totalResults: 0
}

/**
 * Transforms underscore-separated strings into camelcased strings.
 *
 * @func
 * @sig String -> String
 * @param {String} str A string value whose multiple words are separated by underscores
 * @returns {String} A reformatted string whose words are now camelcased together
 */
const camelize = invoker(2, 'replace')(/_([a-z])/g, compose(toUpper, last))

/**
 * Reformats an object's keys from underscore_separated names to camelCasesed names.
 *
 * @func
 * @sig {k: v} -> {k: v}
 * @param {Object} obj An object whose keys are (potentially) separated by underscores
 * @returns {Object} An object whose keys have been changed from underscore_separated to camelcased
 */
const renameKeys = compose(
    merge(metaDefaults),
    fromPairs,
    map(adjust(camelize, 0)),
    toPairs
)

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
    if ([PARSED_TOKEN, LOGIN].includes(action.type)) {
        service.setHeader('Authorization', `Bearer ${
            path(['user', 'token', 'access_token'], action) || prop('token', action)
        }`)
        service.addResponseTransform(formatMeta)
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
    if ([PARSED_TOKEN, LOGIN].includes(action.type)) {
        apolloFetch.use(({options}, fetchNext) => {
            // eslint-disable-next-line no-param-reassign
            options.headers = {
                ...propOr({}, 'headers'),
                authorization: `Bearer ${
                    path(['user', 'token', 'access_token'], action) ||
                    prop('token', action)
                }`
            }
            fetchNext()
        })
    }
    next(action)
}
