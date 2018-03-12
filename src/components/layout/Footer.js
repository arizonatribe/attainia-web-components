import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {getThemeProp} from '../common/helpers'

const Footer = styled.footer`
    background-color: ${getThemeProp(['colors', 'grayscale', 'dk'], 'darkgray')};
    color: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};
    padding: 10px 20px;
    text-align: center;

    & a {
        color: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};
    }

    & a:hover,
    & a:focus {
        border-bottom: 1px solid ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};
    }
`
const WrappedFooter = ({className}) =>
    <Footer className={className}>
        <small>
            2018 © Attainia, Inc. All Rights Reserved.
            <span> | </span>
            <a href="http://www.attainia.com/privacy_policy">Privacy Policy</a>
            <span> | </span>
            <a href="http://www.attainia.com/terms_of_service">Terms of Service</a>
        </small>
    </Footer>

WrappedFooter.propTypes = {
    className: PropTypes.string.isRequired
}

export default WrappedFooter
