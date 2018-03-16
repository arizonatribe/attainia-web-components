import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import {SimpleSvgIcon} from '../common'
import {getThemeProp} from '../common/helpers'
import {LogoutContainer} from '../auth'

const Li = styled.div`
    color: ${getThemeProp(['colors', 'secondary', 'default'], 'royalblue')};
    text-align: center;
    background: white;
    height: 100%;
    padding: 0 15px;

    & img.headerLogo {
        width: 95px;
        height: 25px;
    }

    @supports not (display: grid) {
        display: block;
    }

    @supports (display: grid) {
        display: grid;
        align-content: center;
    }
`
const ListHeader = styled.ul`
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
    list-style: none;
    margin: 0;
    padding: 0;
    background: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};

    .logo {
        padding-left: 50px;
    }

    @supports not (display: grid) {
        .profileMenu,
        .btnSearch,
        .btnNotifications,
        .logo {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        display: grid;
        grid-template-columns: 1fr repeat(2, 50px) 130px;
        grid-template-rows: 50px;
        grid-column-gap: 3px;
    }
`
const Header = props =>
    <ListHeader className={props.className}>
        <Li className="logo">
            <SimpleSvgIcon icon="primary" className="headerLogo" />
        </Li>
        <Li className="btnSearch">
            <SimpleSvgIcon
              icon="search"
              width="25"
              height="25"
              fill={getThemeProp(['colors', 'secondary', 'default'])(props)}
            />
        </Li>
        <Li className="btnNotifications">
            <SimpleSvgIcon
              icon="notification"
              width="25"
              height="25"
              fill={getThemeProp(['colors', 'secondary', 'default'])(props)}
            />
        </Li>
        <Li className="profileMenu">
            <LogoutContainer asLink>Logout</LogoutContainer>
        </Li>
    </ListHeader>

Header.propTypes = {
    className: PropTypes.string.isRequired
}

export default withTheme(Header)
