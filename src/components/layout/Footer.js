import React from 'react'
import {pathOr} from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Footer = styled.footer`
    grid-area: footer;
    display: grid;
    align-content: end;
    align-items: center;
    justify-items: center;
    background: transparent;
    grid-template-rows: 3.6em 2.4em;
    grid-template-areas: "." "smallofthefooter";

    & small {
        display: grid;
        align-content: center;
        justify-items: center;
        justify-content: stretch;
        grid-area: smallofthefooter;
        grid-template-columns: auto 2em auto 2em auto;
        color: ${pathOr('mediumgray', ['theme', 'colors', 'misc', 'gray', 'quicksilver'])};

        & span {
            display: block;
        }

        & a {
            text-decoration: none;
            color: ${pathOr('silver', ['theme', 'colors', 'misc', 'gray', 'silver'])};
        }

        & a:hover,
        & a:focus {
            text-decoration: underline;
        }
    }
`
const WrappedFooter = ({className}) =>
    <Footer className={className}>
        <small>
            <span>2018 © Attainia, Inc. All Rights Reserved.</span>
            <span> | </span>
            <a href="http://www.attainia.com/privacy_policy">Privacy Policy</a>
            <span> | </span>
            <a href="http://www.attainia.com/terms_of_service">Terms of Service</a>
        </small>
    </Footer>

WrappedFooter.propTypes = {
    className: PropTypes.string.isRequired
}

WrappedFooter.defaultProps = {
    className: 'footer'
}

export default WrappedFooter
