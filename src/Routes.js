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

import {withLoginEnhancers} from './components/auth/enhancers'
import {withAuthentication} from './components/auth/decorators'

import store from './store'
import theme from './theme'

const withLayout = withTheseNavItems([
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
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </ThemeProvider>
)
