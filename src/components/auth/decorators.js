import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import ducks, {safeString} from './ducks'

export {withJwtDecode} from './JwtDecode.container'
export {withTokenParsing} from './ParseTokenFromStorage.container'
export {withWriteTokenToStorage} from './WriteTokenToStorage.container'
export {withTokenValidation} from './Validator.container'
export {withTokenInfo} from './TokenInfo.container'
export {withTokenRefresh} from './Refresher.container'
export {withAuthStatusSubscription} from './AuthStatus.container'

const {selectors} = ducks
const locationHelper = locationHelperBuilder({})

export const withAuthentication = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => selectors.isAuthenticated(state),
    wrapperDisplayName: 'Authenticator'
})

export const withPermission = (perm) => {
    const permission = safeString(perm)
    return connectedAuthWrapper({
        authenticatedSelector: state =>
            !selectors.scope(state) || selectors.allScopes(state).includes(permission),
        wrapperDisplayName: 'WithPermission'
    })
}

export const untilAuthenticatedAndThenRedirectBack = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
    authenticatedSelector: state => selectors.isNotAuthenticated(state),
    wrapperDisplayName: 'UntilAuthenticatedAndThenRedirectBack'
})

export const untilAuthenticated = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => selectors.isNotAuthenticated(state),
    wrapperDisplayName: 'UntilAuthenticated'
})
