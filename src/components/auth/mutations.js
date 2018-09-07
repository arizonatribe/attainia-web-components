import {gql} from 'react-apollo'

export const loginUser = `
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            id
            email
            is_active
            last_login
            token {
                access_token
                expires_in
                token_type
                scope
            }
        }
    }
`
export const logoutUser = `
    mutation logoutUser($token: String!) {
        logoutUser(token: $token)
    }
`
export const refreshUser = `
    mutation refreshUser($token: String!) {
        refreshUser(token: $token) {
            access_token
            expires_in
            token_type
            scope
        }
    }
`

export const LOGOUT_USER = gql(logoutUser)
export const LOGIN_USER = gql(loginUser)
export const REFRESH_TOKEN = gql(refreshUser)
