import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import {withTheseNavItems} from './components/layout'
import {
    AuthProvider,
    LoginContainer,
    PasswordHelpContainer,
    RegistrationContainer,
    RegistrationConfirmationContainer,
    RegisterApplicationContainer
} from './components/auth'
import {
    DemoHome,
    DemoNotFound,
    DemoSimpleCube,
    DemoQueryEditor
} from './dev-components'

import {withLoginEnhancers} from './components/auth/enhancers'
import {withAuthentication} from './components/auth/decorators'

import store from './store'
import theme from './theme'

import attainiaHome from './images/attainia_foyer.jpg'

const Home = props => <DemoHome imgSrc={attainiaHome} {...props} />

const withLayout = withTheseNavItems([
    {label: 'Home', link: '/home', iconName: 'home'},
    {label: 'Apis', link: '/api-browser', iconName: 'search'},
    {label: 'Cube', link: '/cube', iconName: 'cube'},
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
                        <Route exact path="/home" component={withAuthentication(withLayout(Home))} />
                        <Route exact path="/login" component={withLoginEnhancers(LoginContainer)} />
                        <Route exact path="/password-help" component={PasswordHelpContainer} />
                        <Route exact path="/register" component={RegistrationContainer} />
                        <Route exact path="/confirm-registration" component={RegistrationConfirmationContainer} />
                        <Route exact path="/register-application" component={RegisterApplicationContainer} />
                        <Route exact path="/cube" component={withLayout(DemoSimpleCube)} />
                        <Route exact path="/api-browser" component={withAuthentication(withLayout(DemoQueryEditor))} />
                        <Route render={props => <DemoNotFound imgSrc={attainiaHome} {...props} />} />
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </ThemeProvider>
)
