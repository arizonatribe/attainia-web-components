import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import {SimpleSvgIcon} from '../common'
import {getThemeProp} from '../common/helpers'
import {LogoutContainer} from '../auth'
import {ContinuousProgress} from '../common/Progress'

const ListHeader = styled.header`
    margin: 0;
    padding: 0;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
    background: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};

    & svg {
        display: block;
    }
    .headerLogo {
        grid-area: headerlogo;
    }
    .notificationIcon {
        grid-area: notificationicon;
    }
    .logoutLink {
        grid-area: logoutlink;
        display: block;
    }

    @supports (display: grid) {
        display: grid;
        align-items: center;
        align-content: start;
        grid-row-gap: 0;
        grid-template-rows: 48px 2px;
        grid-template-columns: 50px 140px 1fr 25px 10em;
        grid-template-areas:
            ". headerlogo . notificationicon logoutlink"
            "pbar pbar pbar pbar pbar";
    }
`
const Header = ({className, progress, logoutCaption, ...restOfProps}) =>
    <ListHeader className={className}>
        <SimpleSvgIcon
          icon="primary"
          width="140"
          height="45"
          className="headerLogo"
        />
        <SimpleSvgIcon
          className="notificationIcon"
          icon="notification"
          width="25"
          height="25"
          fill={getThemeProp(['colors', 'secondary', 'default'])(restOfProps)}
        />
        <LogoutContainer className="logoutLink" asLink>{logoutCaption}</LogoutContainer>
        <ContinuousProgress inProgress styles={{backgroundColor: 'white', height: '2px'}} />
    </ListHeader>

Header.propTypes = {
    logoutCaption: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    progress: PropTypes.number
}

Header.defaultProps = {
    progress: 50,
    logoutCaption: 'Logout',
    className: 'list-header'
}

export default withTheme(Header)
