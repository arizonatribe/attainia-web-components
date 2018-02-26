import {allPass, compose, equals, is, not, path, test} from 'ramda'

export const isSupportedStorageType = test(/(local|session)/i)
export const isValidToken = allPass([
    compose(not, test(/\s/)),
    compose(not, equals('[object Object]')),
    is(String)
])
export const formatBaseUri = uri => (/^https?:\/\//i.test(uri) ? uri : `http://${uri}`)
export const getAccessToken = path(['user', 'token', 'access_token'])
export const getAccessTokenFromStorage = storage => {
    if (/local/i.test(storage)) {
        return localStorage.getItem('token')
    } else if (/session/i.test(storage)) {
        return sessionStorage.getItem('token')
    }
    return localStorage.getItem('token') || sessionStorage.getItem('token')
}
export const removeToken = storage => {
    if (isSupportedStorageType(storage)) {
        if (/local/i.test(storage)) {
            localStorage.removeItem('token')
        } else if (/session/i.test(storage)) {
            sessionStorage.removeItem('token')
        }
    } else {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
    }
}
export const setToken = (token, storage = 'local') => {
    if (isSupportedStorageType(storage) && token) {
        if (/local/i.test(storage)) {
            localStorage.setItem('token', token)
        } else if (/session/i.test(storage)) {
            sessionStorage.setItem('token', token)
        }
    }
}
