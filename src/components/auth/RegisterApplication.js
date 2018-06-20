import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pathOr} from 'ramda'

import Form from 'formatta/Form'
import Link from 'react-router-dom/Link'
import {Button, LinkButton, SimpleSvgIcon, ReduxFormField} from '../common'
import {ContentFullSize} from '../layout'

const StyledForm = styled(Form)`
    & > * {
        margin: ${pathOr('5px', ['theme', 'forms', 'formItemMargin'])};
    }

    & .attainiaLogo {
        margin: 30px auto 15px auto;
    }

    @supports not (display: grid) {
        .registerApplicationButton,
        .redirect,
        .attainiaLogo,
        .instructions,
        .applicationName,
        .grantType,
        .cancelButton {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'header header' 'instructions instructions' 'name name' 'grant grant'
            'redirect redirect' 'save cancel';

        & .attainiaLogo {
            grid-area: header;
        }

        & .instructions {
            grid-area: instructions;
        }

        & .redirect {
            grid-area: redirect;
        }

        & .applicationName {
            grid-area: name;
        }

        & .grantType {
            grid-area: grant;
        }

        & .registerApplicationButton {
            grid-area: save;
        }

        & .cancelButton {
            grid-area: cancel;
        }
    }
`
const RegisterApplication = ({handleSubmit, tryRegisterApp}) =>
    <ContentFullSize>
        <StyledForm onSubmit={handleSubmit(tryRegisterApp)}>
            <SimpleSvgIcon className="attainiaLogo" width="161" height="39" icon="primary" />
            <p className="instructions">Register Your Application</p>
            <ReduxFormField
              id="RegisterApplicationForm-name"
              className="applicationName"
              placeholder="name"
              name="name"
            />
            <ReduxFormField
              id="RegisterApplicationForm-grantType"
              className="grantType"
              placeholder="grant type"
              name="grantType"
            />
            <ReduxFormField
              id="RegisterApplicationForm-redirect"
              className="redirect"
              placeholder="redirects to"
              name="redirect"
              type="url"
            />
            <Button className="registerApplicationButton" type="submit">Register</Button>
            <LinkButton className="cancelButton"><Link to="/">Cancel</Link></LinkButton>
        </StyledForm>
    </ContentFullSize>

RegisterApplication.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryRegisterApp: PropTypes.func.isRequired
}

export default RegisterApplication
