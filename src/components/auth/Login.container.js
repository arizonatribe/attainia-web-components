import {is, toPairs, without} from 'ramda'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {withApollo, compose} from 'react-apollo'

import Login from './Login'
import {LOGIN_USER} from './mutations'
import {setToken} from './helpers'
import ducks from './ducks'

const {selectors, validators, creators: {handleError, login, toggleRememberMe, finishedLoading, startedLoading}} = ducks

const mapStateToProps = state => ({
    email: selectors.email(state),
    hasAuthError: selectors.hasAuthError(state),
    loading: state.auth.loading,
    rememberMe: state.auth.rememberMe,
    storageType: state.auth.storageType
})

const mapDispatchToProps = {handleError, login, startedLoading, finishedLoading, toggleRememberMe}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    toggleRememberMe: dispatchProps.toggleRememberMe,
    async tryLogin({email, password}) {
        try {
            dispatchProps.startedLoading()

            const {data: {error, loginUser}} = await ownProps.client.mutate({
                mutation: LOGIN_USER,
                variables: {email, password}
            })
            if (error) {
                throw new Error(error)
            }
            if (loginUser) {
                if (is(Function, ownProps.onLogin)) {
                    const deferred = ownProps.onLogin(loginUser)
                    if (deferred && deferred.then) {
                        await deferred
                    }
                }

                dispatchProps.login(loginUser)

                const {token} = loginUser

                if (token.redirect_uris) {
                    const redirect_uri = token.redirect_uris.split(' ')[0]
                    window.location = `${redirect_uri}${redirect_uri.includes('?') ? '&' : '?'}${
                        toPairs(without('redirect_uris', token)).map(([key, val]) => `${key}=${val}`).join('&')
                    }`
                } else if (stateProps.rememberMe) {
                    setToken(token.access_token, ownProps.storageType)
                }
                dispatchProps.finishedLoading()
            }
        } catch (err) {
            dispatchProps.handleError(err)
        }
    }
})

export default compose(
    withApollo,
    reduxForm({
        validate: validators.login,
        form: 'LoginForm',
        fields: ['email', 'password']
    }),
    connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(Login)
