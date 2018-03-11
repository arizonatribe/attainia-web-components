import {gql} from 'react-apollo'

export const getEmail = `
query getEmail($token: String!) {
    getEmail(token: $token) {
        email
    }
}
`
export const validateToken = `
query validateToken($token: String!) {
    validateToken(token: $token)
}
`
export const getTokenInfo = `
query getTokenInfo($token: String!) {
    getTokenInfo(token: $token) {
        active
        scope
        exp
        user {
            id
            email
        }
    }
}
`

export const GET_EMAIL = gql(getEmail)
export const VALIDATE_TOKEN = gql(validateToken)
export const GET_TOKEN_INFO = gql(getTokenInfo)
