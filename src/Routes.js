import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import Home from './App'
import {withTheseNavItems, NotFound} from './components/layout'
import {
    AuthProvider,
    LoginContainer,
    PasswordHelpContainer,
    RegistrationContainer,
    RegistrationConfirmationContainer,
    RegisterApplicationContainer
} from './components/auth'
import {ApiBrowser} from './components/api-browser'

import {withLoginEnhancers} from './components/auth/enhancers'
import {withAuthentication} from './components/auth/decorators'

import store, {apolloFetch} from './store'
import theme from './theme'

const ApiBrowserWithFetcher = props => <ApiBrowser {...props} graphQlFetcher={apolloFetch} />

const withLayout = withTheseNavItems([
    {label: 'Apis', link: '/api-browser', iconName: 'search'},
    {label: 'Bells', link: '/bells', iconName: 'notification'},
    {label: 'Printers', link: '/printers', iconName: 'print'},
    {label: 'Paper', link: '/paper', iconName: 'document'},
    {label: 'Garbage Cans', link: '/wastebaskets', iconName: 'delete'},
    {label: 'Pencils', link: '/pencils', iconName: 'edit'}
])

export default (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={withAuthentication(withLayout(Home))} />
                        <Route exact path="/login" component={withLoginEnhancers(LoginContainer)} />
                        <Route exact path="/password-help" component={PasswordHelpContainer} />
                        <Route exact path="/register" component={RegistrationContainer} />
                        <Route exact path="/confirm-registration" component={RegistrationConfirmationContainer} />
                        <Route exact path="/register-application" component={RegisterApplicationContainer} />
                        <Route exact path="/api-browser" component={withAuthentication(ApiBrowserWithFetcher)} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </ThemeProvider>
)
