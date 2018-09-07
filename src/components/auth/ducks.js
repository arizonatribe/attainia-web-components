import LocalizedStrings from 'react-localization'
import {createDuck, createSelector, createDuckSelector} from 'attadux'
import {
    ensureString,
    isPlainObj,
    isNotNil,
    isNotBlankString,
    isStringieThingie,
    isValidEmail,
    isValidPassword,
    parseError as getMessage,
    removeErrorLabel
} from 'attasist'
import {
    always,
    compose,
    identity,
    ifElse,
    is,
    not,
    omit,
    path,
    pathOr,
    split,
    toLower,
    toString,
    when
} from 'ramda'

const store = 'auth'
const ONE_HOUR = 3600000
const safeString = compose(toLower, ensureString)
const parseError = compose(removeErrorLabel, getMessage)
const makeScopesArray = ifElse(
    isStringieThingie,
    compose(split(' '), toLower, when(is(Number), toString)),
    always([])
)

/* to avoid breaking changes for now */
export {
    isNotBlankString,
    isNotNil,
    isPlainObj,
    isStringieThingie,
    isValidEmail,
    isValidPassword,
    parseError,
    removeErrorLabel,
    safeString
}

export default createDuck({
    store,
    namespace: 'awc',
    types: [
        'CLEAR_LOGIN',
        'CLEAR_ERROR',
        'CLEAR_REFRESH',
        'DECODED_JWT',
        'ERROR',
        'LOADING_FINISHED',
        'LOADING_STARTED',
        'LOGIN',
        'LOGOUT',
        'PARSED_TOKEN',
        'POST_LOGIN',
        'REFRESH',
        'REMEMBER_ME',
        'UPDATED_TOKEN',
        'USER_INFO_FROM_TOKEN',
        'VALIDATED_TOKEN'
    ],
    initialState: {
        baseUrl: 'localhost',
        error: '',
        loading: false,
        rememberMe: false,
        storageType: 'local',
        user: {},
        isAuthenticated: false,
        isAuthenticating: false
    },
    multipliers: ({types, selectors}) => ({
        [types.LOGIN]: {shapeyMode: 'strict', type: types.POST_LOGIN, token: selectors.selectToken},
        [types.UPDATED_TOKEN]: {shapeyMode: 'strict', type: types.POST_LOGIN, token: selectors.selectToken},
        [types.VALIDATED_TOKEN]: {shapeyMode: 'strict', type: types.POST_LOGIN, token: selectors.selectToken}
    }),
    selectors: {
        root: identity,
        error: path([store, 'error']),
        id: path([store, 'user', 'id']),
        name: path([store, 'user', 'name']),
        email: path([store, 'user', 'email']),
        parsedToken: path([store, 'parsed_token']),
        token: path([store, 'user', 'token', 'access_token']),
        scope: path([store, 'user', 'scope']),
        expires_in: path([store, 'user', 'token', 'expires_in']),
        hasAuthError: createDuckSelector(selectors =>
            createSelector(selectors.error, Boolean)
        ),
        hasUser: createDuckSelector(selectors =>
            createSelector(
                selectors.id,
                selectors.name,
                (...props) => props.every(isStringieThingie)
            )
        ),
        isAuthenticated: compose(Boolean, path([store, 'isAuthenticated'])),
        isAuthenticating: compose(Boolean, path([store, 'isAuthenticating'])),
        isNotAuthenticated: createDuckSelector(selectors => createSelector(selectors.isAuthenticated, not)),
        allScopes: createDuckSelector(selectors => createSelector(selectors.scope, makeScopesArray)),
        refreshInMs: createDuckSelector(selectors =>
            createSelector(
                selectors.expires_in,
                expiresIn => Math.max((Number(expiresIn || ONE_HOUR) - 10) * 1000, 0)
            )
        ),
        refreshAt: createDuckSelector(selectors =>
            createSelector(
                selectors.refreshInMs,
                refreshInMs => new Date(Date.now() + refreshInMs)
            )
        ),
        selectToken: val => [
            path(['user', 'token', 'access_token']),
            path(['token', 'access_token']),
            path(['token']),
            always(`${val}`)
        ].map(fn => fn(val)).find(Boolean),
        storedToken: createDuckSelector(selectors =>
            createSelector(
                selectors.token,
                selectors.parsedToken,
                (t, pt) => t || pt
            )
        )
    },
    creators: ({types}) => ({
        handleError: error => ({error, type: types.ERROR}),
        clearError: () => ({type: types.CLEAR_ERROR}),
        decodedJwt: jwt => ({jwt, type: types.DECODED_JWT}),
        refresh: refreshTimeout => ({refreshTimeout, type: types.REFRESH}),
        clearRefresh: () => ({type: types.CLEAR_REFRESH}),
        toggleRememberMe: rememberMe => ({rememberMe, type: types.REMEMBER_ME}),
        login: user => ({user, type: types.LOGIN}),
        logout: () => ({type: types.LOGOUT}),
        updatedToken: token => ({token, type: types.UPDATED_TOKEN}),
        parsedToken: token => ({token, type: types.PARSED_TOKEN}),
        validatedToken: token => ({token, type: types.VALIDATED_TOKEN}),
        userInfoFromToken: user => ({user, type: types.USER_INFO_FROM_TOKEN}),
        startedLoading: () => ({type: types.LOADING_STARTED}),
        finishedLoading: () => ({type: types.LOADING_FINISHED})
    }),
    validators: {
        login: {
            password: [
                [isStringieThingie, new LocalizedStrings({
                    en: {password: 'Please enter your password'},
                    fr: {password: 's\'il vous plait entrez votre mot de passe'},
                    es: {password: 'Por favor, introduzca su contraseña'}
                }).password]
            ],
            email: [
                [isValidEmail, new LocalizedStrings({
                    en: {email: 'Please enter your email'},
                    fr: {email: 'Entrez votre adresse e-mail'},
                    es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
                }).email]
            ]
        }
    },
    reducer(state, action, {types, initialState, selectors}) {
        switch (action.type) {
            case types.CANCEL:
                return {...state}
            case types.CLEAR_ERROR:
                return {...state, error: ''}
            case types.CLEAR_REFRESH:
                return {
                    ...state,
                    refreshTimeout: clearTimeout(state.refreshTimeout)
                }
            case types.CLEAR_LOGIN:
                return {...state, ...omit(['baseUrl'], initialState)}
            case types.ERROR:
                return {
                    ...state,
                    error: parseError(action.error),
                    loading: false
                }
            case types.DECODED_JWT:
                return {
                    ...state,
                    user: {
                        ...state.user,
                        ...(action.jwt || {}),
                        id: path(['jwt', 'sub'], action) || state.user.id
                    }
                }
            case types.LOADING_FINISHED:
                return {...state, loading: false}
            case types.LOADING_STARTED:
                return {...state, loading: true}
            case types.LOGIN:
                return {...state, user: action.user, isAuthenticated: true, isAuthenticating: false}
            case types.LOGOUT: {
                if (state.refreshTimeout) clearTimeout(state.refreshTimeout)

                return {
                    ...omit(['refreshTimeout', 'parsed_token'], state),
                    ...omit(['baseUrl'], initialState),
                    isAuthenticating: false,
                    isAuthenticated: false
                }
            }
            case types.REFRESH: {
                if (state.refreshTimeout) clearTimeout(state.refreshTimeout)

                return {
                    ...state,
                    refreshTimeout: action.refreshTimeout
                }
            }
            case types.REMEMBER_ME:
                return {...state, rememberMe: !state.rememberMe}
            case types.PARSED_TOKEN:
                return {...state, parsed_token: action.token, isAuthenticating: true}
            case types.VALIDATED_TOKEN:
            case types.UPDATED_TOKEN: {
                return {
                    ...omit(['parsed_token'], state),
                    isAuthenticated: true,
                    isAuthenticating: false,
                    user: {
                        ...state.user,
                        token: {
                            ...pathOr({}, ['user', 'token'], state),
                            access_token: selectors.selectToken(action)
                        }
                    }
                }
            }
            case types.USER_INFO_FROM_TOKEN:
                return {...omit(['parsed_token'], state), user: {...state.user, ...action.user}}
            // no default
        }

        return state
    }
})
