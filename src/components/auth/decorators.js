import {compose, contains, either, filter, intersection, is, isEmpty, map, not} from 'ramda'
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import ducks, {safeString, isStringieThingie} from './ducks'

export {withJwtDecode} from './JwtDecode.container'
export {withTokenParsing} from './ParseTokenFromStorage.container'
export {withWriteTokenToStorage} from './WriteTokenToStorage.container'
export {withTokenValidation} from './Validator.container'
export {withTokenInfo} from './TokenInfo.container'
export {withTokenRefresh} from './Refresher.container'
export {withAuthStatusSubscription} from './AuthStatus.container'

const {selectors: {isAuthenticated, isAuthenticating, isNotAuthenticated, allScopes, scope}} = ducks
const locationHelper = locationHelperBuilder({})

export const withAuthentication = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: isAuthenticated,
    wrapperDisplayName: 'Authenticator'
})

export const withPermission = (perm) => {
    if (is(Array, perm)) {
        const permissions = compose(map(safeString), filter(isStringieThingie))(perm)
        return connectedAuthWrapper({
            wrapperDisplayName: 'WithAllPermissions',
            authenticatedSelector: either(
                compose(not, scope),
                compose(not, isEmpty, intersection(permissions), allScopes)
            )
        })
    }

    return connectedAuthWrapper({
        wrapperDisplayName: 'WithSinglePermission',
        authenticatedSelector: either(
            compose(not, scope),
            compose(contains(safeString(perm)), allScopes)
        )
    })
}

export const untilAuthenticatedAndThenRedirectBack = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
    authenticatedSelector: isNotAuthenticated,
    authenticatingSelector: isAuthenticating,
    wrapperDisplayName: 'UntilAuthenticatedAndThenRedirectBack'
})

export const untilAuthenticated = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: isNotAuthenticated,
    wrapperDisplayName: 'UntilAuthenticated'
})
