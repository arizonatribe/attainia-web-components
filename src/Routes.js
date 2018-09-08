import React from 'react'
import {compose} from 'ramda'
import {connect, Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import {withTheseNavItems} from './components/layout'
import {AuthProvider, LoginContainer} from './components/auth'
import {
  DemoHome,
  DemoList,
  DemoNotFound,
  DemoSimpleCube
} from './dev-components'

import {withLoginEnhancers} from './components/auth/enhancers'
import {withAuthentication} from './components/auth/decorators'

import store from './store'
import theme from './theme'

import attainiaHome from './images/attainia_foyer.jpg'

const Home = props => <DemoHome imgSrc={attainiaHome} {...props} />
const DList = props => <DemoList imgSrc={attainiaHome} {...props} />

const withDispatcher = connect()
const withLayout = withTheseNavItems([
  {label: 'Home', link: '/home', icon: 'home'},
  {label: 'List Table', link: '/music', icon: 'music'},
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
            <Route exact path="/cube" component={withEnhancers(DemoSimpleCube)} />
            <Route exact path="/music" component={withEnhancers(DList)} />
            <Route render={props => <DemoNotFound imgSrc={attainiaHome} {...props} />} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </ThemeProvider>
)
