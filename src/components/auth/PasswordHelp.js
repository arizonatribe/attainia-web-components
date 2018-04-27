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

    @supports not (display: grid) {
        .attainiaLogo, .passwordHelpButton, .email, .cancelButton {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          "header header"
          "instructions instructions"
          "email email"
          "submit cancel";

        & .attainiaLogo {
            grid-area: header;
        }

        & .email {
            grid-area: email;
        }

        & .passwordHelpButton {
            grid-area: submit;
        }

        & .cancelButton {
            grid-area: cancel;
        }
    }
`
const PasswordHelp = ({handleSubmit, tryPasswordHelp, email}) =>
    <StyledForm className="passwordHelpForm" onSubmit={handleSubmit(tryPasswordHelp)}>
        <SimpleSvgIcon className="attainiaLogo" width="161" height="39" icon="primary" />
        <ReduxFormField
          id="PasswordHelpForm-email"
          className="email"
          placeholder="email"
          name="email"
          type="email"
          value={email}
        />
        <Button className="passwordHelpButton" type="submit">Reset Password</Button>
        <LinkButton className="cancelButton"><Link to="/">Cancel</Link></LinkButton>
    </StyledForm>

PasswordHelp.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryPasswordHelp: PropTypes.func.isRequired,
    email: PropTypes.string
}

export default PasswordHelp
