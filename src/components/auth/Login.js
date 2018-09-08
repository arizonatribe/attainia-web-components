import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Form, BasicFormField} from 'formatta'
import {pathOr} from 'ramda'

import {ContentFullSize} from '../layout'
import AuthError from './AuthError.container'
import {SpinningButton, SimpleSvgIcon, ReduxFormField} from '../common'

const StyledLoginForm = styled(Form)`
    & > * {
        margin: ${pathOr('5px', ['theme', 'forms', 'formItemMargin'])};
        &:focus {
            outline: none;
        }
    }

    & .loginHeader > * {
        margin: 30px auto 15px auto;
    }

    & .loginButton {
        text-align: center;
    }

    @supports not (display: grid) {
        .loginHeader,
        .email,
        .register,
        .rememberMe,
        .loginButton {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            'header header'
            'email email'
            'password password'
            'remember-me remember-me'
            'login-button login-button';

        & .loginHeader {
            grid-area: header;
        }

        & .email {
            grid-area: email;
        }

        & .password {
            grid-area: password;
        }

        & .rememberMe {
            grid-area: remember-me;
        }

        & .loginButton {
            grid-area: login-button;
        }
    }
`
class Login extends PureComponent {
  render() {
    const {
      handleSubmit, toggleRememberMe, tryLogin,
      email, loginLabel, rememberMeLabel,
      hasAuthError, loading, rememberMe
    } = this.props

    return (
      <ContentFullSize>
        <StyledLoginForm onSubmit={handleSubmit(tryLogin)} {...this.props}>
          <header className="loginHeader">
            {hasAuthError ? <AuthError /> : <SimpleSvgIcon width="161" height="39" icon="primary" />}
          </header>
          <ReduxFormField
            id="LoginForm-email"
            className="email"
            placeholder="email"
            name="email"
            type="email"
            value={email}
          />
          <ReduxFormField
            id="LoginForm-password"
            className="password"
            placeholder="password"
            type="password"
            name="password"
          />
          <BasicFormField
            id="LoginForm-rememberMe"
            className="rememberMe"
            label={rememberMeLabel}
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            value={rememberMe}
            handlers={{onChange: toggleRememberMe}}
          />
          <SpinningButton inProgress={loading} className="loginButton" type="submit">
            {loginLabel}
          </SpinningButton>
        </StyledLoginForm>
      </ContentFullSize>
    )
  }
}

Login.propTypes = {
  email: PropTypes.string,
  loginLabel: PropTypes.string.isRequired,
  rememberMeLabel: PropTypes.string.isRequired,
  hasAuthError: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  rememberMe: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleRememberMe: PropTypes.func.isRequired,
  tryLogin: PropTypes.func.isRequired
}

Login.defaultProps = {
  loginLabel: 'Login',
  rememberMeLabel: 'Remember Me',
  hasAuthError: false,
  loading: false,
  rememberMe: false
}

export default Login
