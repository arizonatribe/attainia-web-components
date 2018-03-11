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
export const passwordReset = `
    mutation passwordReset($email: String!) {
        passwordReset(email: $email)
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
export const registerApp = `
    mutation registerApp($name: String!, $redirectUri: String!) {
        registerApp(name: $name, redirectUri: $redirectUri) {
            name
            redirect_uris
            skip_authorization
            authorization_grant_type
            client_id
            client_secret
        }
    }
`
export const registerUser = `
    mutation registerUser($email: String!, $name: String!) {
        registerUser(email: $email, name: $name)
    }
`
export const confirmUserRegistration = `
    mutation confirmUserRegistration($email: String!, $name: String!) {
        confirmUserRegistration(email: $email, name: $name)
    }
`

export const REGISTER_APP = gql(registerApp)
export const PASSWORD_RESET = gql(passwordReset)
export const LOGOUT_USER = gql(logoutUser)
export const LOGIN_USER = gql(loginUser)
export const REFRESH_TOKEN = gql(refreshUser)
export const REGISTER_USER = gql(registerUser)
export const CONFIRM_USER_REGISTRATION = gql(confirmUserRegistration)
