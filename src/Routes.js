import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import {RedocStandalone} from 'redoc'

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
    DemoDrawers,
    DemoNotFound,
    DemoSimpleCube,
    DemoQueryEditor
} from './dev-components'

import {withLoginEnhancers} from './components/auth/enhancers'
import {withAuthentication} from './components/auth/decorators'

import store, {OPENAPI_URL} from './store'
import theme from './theme'

import attainiaHome from './images/attainia_foyer.jpg'

const DemoRedoc = props => <RedocStandalone {...props} specUrl={OPENAPI_URL} />
const Home = props => <DemoHome imgSrc={attainiaHome} {...props} />
const Drawers = props => <DemoDrawers imgSrc={attainiaHome} {...props} />

const withLayout = withTheseNavItems([
    {label: 'Home', link: '/home', iconName: 'home'},
    {label: 'Music', link: '/music', iconName: 'music', items: [{label: 'Test', link: '/some'}]},
    {label: 'GraphQL API', link: '/graphql-api', iconName: 'star'},
    {label: 'Redoc', link: '/open-api', iconName: 'cogs'},
    {label: 'Cube', link: '/cube', iconName: 'cube'}
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
                        <Route exact path="/music" component={withLayout(Drawers)} />
                        <Route exact path="/open-api" component={withAuthentication(DemoRedoc)} />
                        <Route exact path="/graphql-api" component={withAuthentication(withLayout(DemoQueryEditor))} />
                        <Route render={props => <DemoNotFound imgSrc={attainiaHome} {...props} />} />
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </ThemeProvider>
)
