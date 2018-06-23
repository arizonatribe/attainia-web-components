import {gql} from 'react-apollo'

export const getEmail = `
query getEmail($token: String!) {
    getEmail(token: $token)
}
`
export const validateToken = `
query validateToken($token: String!) {
    validateToken(token: $token) {
        active
        access_token
        scope
        exp
        nbf
        iat
        aud
        name
        org
        iss
        email: username
        id: sub
        sub
        jti
        token_type
        token_usage
    }
}
`
export const getTokenInfo = `
query getTokenInfo($token: String!) {
    getTokenInfo(token: $token) {
        active
        access_token
        scope
        exp
        nbf
        iat
        aud
        name
        org
        iss
        email: username
        id: sub
        sub
        jti
        token_type
        token_usage
    }
}
`

export const GET_EMAIL = gql(getEmail)
export const VALIDATE_TOKEN = gql(validateToken)
export const GET_TOKEN_INFO = gql(getTokenInfo)
