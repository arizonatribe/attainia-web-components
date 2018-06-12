import React from 'react'
import {compose} from 'ramda'
import {connect, Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import {RedocStandalone} from 'redoc'

import {withTheseNavItems} from './components/layout'
import {
    AuthProvider,
    LoginContainer,
    PasswordHelpContainer as PasswordHelp,
    RegistrationContainer as Registration,
    RegistrationConfirmationContainer,
    RegisterApplicationContainer as RegisterApplication
} from './components/auth'
import {
    DemoHome,
    DemoList,
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
const DList = props => <DemoList imgSrc={attainiaHome} {...props} />

const withDispatcher = connect()
const withLayout = withTheseNavItems([
    {label: 'Home', link: '/home', icon: 'home'},
    {label: 'List Table', link: '/music', icon: 'music'},
    {label: 'GraphQL API', link: '/graphql-api', icon: 'star'},
    {label: 'Redoc', link: '/open-api', icon: 'cogs'},
    {label: 'Cube', link: '/cube', icon: 'cube'}, {
        label: 'Auth',
        icon: 'lock',
        items: [{
            label: 'User Registration',
            link: '/register',
            padding: '10px 0 10px 20px',
            icon: 'plus',
            iconHeight: 10,
            iconWidth: 10,
            isIndented: false
        }, {
            label: 'Create Application',
            link: '/register-application',
            padding: '10px 0 10px 20px',
            iconHeight: 10,
            icon: 'plus',
            iconWidth: 10,
            isIndented: false
        }, {
            label: 'Password Reset',
            link: '/password-help',
            padding: '10px 0 10px 20px',
            iconHeight: 10,
            icon: 'plus',
            iconWidth: 10,
            isIndented: false
        }, {
            label: 'Login',
            link: '/demo-login',
            padding: '10px 0 10px 20px',
            iconHeight: 10,
            icon: 'plus',
            iconWidth: 10,
            isIndented: false
        }]
    }
])
const withEnhancers = compose(
    withAuthentication,
    withDispatcher,
    withLayout
)

export default (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={withEnhancers(Home)} />
                        <Route exact path="/home" component={withEnhancers(Home)} />
                        <Route exact path="/login" component={withLoginEnhancers(LoginContainer)} />
                        <Route exact path="/demo-login" component={withEnhancers(LoginContainer)} />
                        <Route exact path="/password-help" component={withEnhancers(PasswordHelp)} />
                        <Route exact path="/register" component={withEnhancers(Registration)} />
                        <Route exact path="/confirm-registration" component={RegistrationConfirmationContainer} />
                        <Route exact path="/register-application" component={withEnhancers(RegisterApplication)} />
                        <Route exact path="/cube" component={withEnhancers(DemoSimpleCube)} />
                        <Route exact path="/music" component={withEnhancers(DList)} />
                        <Route exact path="/open-api" component={withAuthentication(DemoRedoc)} />
                        <Route exact path="/graphql-api" component={withEnhancers(DemoQueryEditor)} />
                        <Route render={props => <DemoNotFound imgSrc={attainiaHome} {...props} />} />
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </ThemeProvider>
)
