import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Link from 'react-router-dom/Link'
import {Button, LinkButton, Form, SimpleSvgIcon, ReduxFormField} from '../common'
import {getThemeProp} from '../common/helpers'

const StyledForm = styled(Form)`
    & > * {
        margin: ${getThemeProp(['forms', 'formItemMargin'], '5px')};
    }

    & .attainiaLogo {
        margin: 30px auto 15px auto;
    }

    & .instructions {
        text-align: center;
    }

    @supports not (display: grid) {
        .registrationButton,
        .attainiaLogo,
        .instructions,
        .name,
        .email,
        .cancelButton {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'header header' 'instructions instructions' 'name name' 'email email' 'save cancel';

        & .attainiaLogo {
            grid-area: header;
        }

        & .instructions {
            grid-area: instructions;
        }

        & .name {
            grid-area: name;
        }

        & .email {
            grid-area: email;
        }

        & .registrationButton {
            grid-area: save;
        }

        & .cancelButton {
            grid-area: cancel;
        }
    }
`
const Registration = ({handleSubmit, tryRegister, formCaption, registerLabel}) =>
    <StyledForm onSubmit={handleSubmit(tryRegister)}>
        <SimpleSvgIcon className="attainiaLogo" width="161" height="39" icon="primary" />
        <p className="instructions">{formCaption}</p>
        <ReduxFormField
          id="RegistrationForm-name"
          className="name"
          placeholder="name"
          name="name"
        />
        <ReduxFormField
          id="RegistrationForm-email"
          className="email"
          placeholder="email"
          name="email"
          type="email"
        />
        <Button className="registrationButton" type="submit">{registerLabel}</Button>
        <LinkButton className="cancelButton"><Link to="/">Cancel</Link></LinkButton>
    </StyledForm>

Registration.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryRegister: PropTypes.func.isRequired,
    registerLabel: PropTypes.string.isRequired,
    formCaption: PropTypes.string
}

Registration.defaultProps = {
    registerLabel: 'Register',
    formCaption: 'New User Registration'
}

export default Registration
