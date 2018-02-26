import LocalizedStrings from 'react-localization'
import {createDuck, createSelector, createDuckSelector} from 'attadux'
import {
    allPass,
    complement,
    compose,
    either,
    find,
    identity,
    ifElse,
    is,
    isNil,
    not,
    omit,
    path,
    prop,
    split,
    test,
    toString,
    trim
} from 'ramda'

const ONE_HOUR = 3600000

export const isNotNil = complement(isNil)
export const isNotBlankString = compose(not, test(/^\s*$/))
export const isStringieThingie = allPass([isNotBlankString, either(is(Number), is(String)), isNotNil])
export const isValidEmail = test(/^[^.\s@:][^\s@:]*(?!\.)@[^.\s@]+(?:\.[^.\s@]+)*$/)
export const isValidPassword = test(/^([A-Z]|[a-z])([a-z]|[0-9]|[!@#$%^&*()[\];:,.<>?*^+=_-]){6,50}$/)
export const parseError = compose(
    trim,
    find(isStringieThingie),
    split(/(?:\S*\s*)?error:/i),
    ifElse(is(String), identity, toString),
    ifElse(is(Object), prop('message'), identity)
)

export default createDuck({
    store: 'auth',
    namespace: 'awc',
    types: [
        'CLEAR_LOGIN',
        'CLEAR_ERROR',
        'CLEAR_REFRESH',
        'CONFIRM_USER_REGISTRATION',
        'DECODED_JWT',
        'ERROR',
        'LOADING_FINISHED',
        'LOADING_STARTED',
        'LOGIN',
        'LOGOUT',
        'PARSED_TOKEN',
        'PASSWORD_HELP',
        'REFRESH',
        'REGISTER_APP',
        'REGISTER_USER',
        'REMEMBER_ME',
        'UPDATED_TOKEN',
        'USER_INFO_FROM_TOKEN',
        'VALIDATED_TOKEN'
    ],
    initialState: {
        app: {},
        baseUrl: 'localhost',
        error: '',
        loading: false,
        menu: {
            profile: []
        },
        rememberMe: false,
        storageType: 'local',
        user: {}
    },
    selectors: {
        root: identity,
        error: path(['auth', 'error']),
        id: path(['auth', 'user', 'id']),
        name: path(['auth', 'user', 'name']),
        role: path(['auth', 'user', 'role']),
        email: path(['auth', 'user', 'email']),
        parsedToken: path(['auth', 'parsed_token']),
        token: path(['auth', 'user', 'token', 'access_token']),
        expires_in: path(['auth', 'user', 'token', 'expires_in']),
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
        isAuthenticated: createDuckSelector(selectors =>
            createSelector(selectors.id, isStringieThingie)
        ),
        isNotAuthenticated: createDuckSelector(selectors =>
            createSelector(selectors.id, complement(isStringieThingie))
        ),
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
        confirmRegistration: () => ({type: types.CONFIRM_USER_REGISTRATION}),
        decodedJwt: jwt => ({jwt, type: types.DECODED_JWT}),
        passwordHelp: email => ({email, type: types.PASSWORD_HELP}),
        refresh: refreshTimeout => ({refreshTimeout, type: types.REFRESH}),
        clearRefresh: () => ({type: types.CLEAR_REFRESH}),
        register: user => ({user, type: types.REGISTER_USER}),
        registerApp: app => ({app, type: types.REGISTER_APP}),
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
        passwordHelp: {
            email: [
                [isStringieThingie, new LocalizedStrings({
                    en: {email: 'Please enter your email'},
                    fr: {email: 'Entrez votre adresse e-mail'},
                    es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
                }).email]
            ]
        },
        login: {
            password: [
                [isStringieThingie, new LocalizedStrings({
                    en: {password: 'Please enter your password'},
                    fr: {password: 's\'il vous plait entrez votre mot de passe'},
                    es: {password: 'Por favor, introduzca su contraseña'}
                }).password]
            ],
            email: [
                [isStringieThingie, new LocalizedStrings({
                    en: {email: 'Please enter your email'},
                    fr: {email: 'Entrez votre adresse e-mail'},
                    es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
                }).email]
            ]
        },
        applicationRegistration: {
            name: [
                [isStringieThingie, new LocalizedStrings({
                    en: {name: 'Please enter your name'},
                    fr: {name: 'S\'il vous plaît entrez votre nom'},
                    es: {name: 'por favor, escriba su nombre'}
                }).name]
            ],
            redirect: [
                [isStringieThingie, new LocalizedStrings({
                    en: {redirect: 'Please enter a URL'},
                    fr: {redirect: 'Entrez une URL'},
                    es: {redirect: 'Ingrese una URL'}
                }).redirect]
            ]
        },
        userRegistrationConfirmation: {
            password: [
                [isStringieThingie, new LocalizedStrings({
                    en: {password: 'Please enter your password'},
                    fr: {password: 's\'il vous plait entrez votre mot de passe'},
                    es: {password: 'Por favor, introduzca su contraseña'}
                }).password],
                [isValidPassword, new LocalizedStrings({
                    /* eslint-disable max-len */
                    en: {password: 'Passwords should be greater than 6 alphanumeric characters. Some special characters are allowed.'},
                    fr: {password: 'Les mots de passe doivent être supérieurs à 6 caractères. Algunos caracteres especiales están permitidos.'},
                    es: {password: 'Las contraseñas deben tener más de 6 caracteres. Certains caractères spéciaux sont autorisés.'}
                    /* eslint-enable max-len */
                }).password]
            ],
            confirm: [
                [isStringieThingie, new LocalizedStrings({
                    en: {confirm: 'Please confirm your password'},
                    fr: {confirm: 's\'il vous plait entrez votre mot de passe'},
                    es: {confirm: 'Por favor, introduzca su contraseña'}
                }).confirm],
                [(conf, fields) => conf === fields.password, new LocalizedStrings({
                    en: {confirm: 'Passwords do not match'},
                    fr: {confirm: 'Les mots de passe ne correspondent pas'},
                    es: {confirm: 'Las contraseñas no coinciden'}
                }).confirm]
            ]
        },
        userRegistration: {
            name: [
                [isStringieThingie, new LocalizedStrings({
                    en: {name: 'Please enter your name'},
                    fr: {name: 'S\'il vous plaît entrez votre nom'},
                    es: {name: 'por favor, escriba su nombre'}
                }).name]
            ],
            email: [
                [isStringieThingie, new LocalizedStrings({
                    en: {email: 'Please enter your email address'},
                    fr: {email: 'Entrez votre adresse e-mail'},
                    es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
                }).email],
                [isValidEmail, new LocalizedStrings({
                    en: {email: 'Invalid email address'},
                    fr: {email: 'Adresse e-mail invalide'},
                    es: {email: 'Dirección de correo electrónico no válida'}
                }).email]
            ]
        }
    },
    reducer(state, action, {types, initialState}) {
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
                return {...state, user: action.user}
            case types.LOGOUT: {
                if (state.refreshTimeout) clearTimeout(state.refreshTimeout)

                return {
                    ...omit(['refreshTimeout', 'parsed_token'], state),
                    ...omit(['baseUrl'], initialState)
                }
            }
            case types.PASSWORD_HELP:
                return {...state, user: {email: action.email}}
            case types.REFRESH: {
                if (state.refreshTimeout) clearTimeout(state.refreshTimeout)

                return {
                    ...state,
                    refreshTimeout: action.refreshTimeout
                }
            }
            case types.REGISTER_APP:
                return {...state, app: action.app}
            case types.REGISTER_USER:
                return {
                    ...state,
                    user: {
                        name: action.user.name,
                        email: action.user.email
                    }
                }
            case types.REMEMBER_ME:
                return {...state, rememberMe: !state.rememberMe}
            case types.PARSED_TOKEN:
                return {...state, parsed_token: action.token}
            case types.VALIDATED_TOKEN:
            case types.UPDATED_TOKEN: {
                return {
                    ...omit(['parsed_token'], state),
                    user: {
                        ...state.user,
                        token: action.token
                    }
                }
            }
            case types.USER_INFO_FROM_TOKEN:
                return {
                    ...omit(['parsed_token'], state),
                    user: {
                        ...state.user,
                        ...action.user
                    }
                }
            // no default
        }

        return state
    }
})
