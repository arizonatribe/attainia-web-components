import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import {SimpleSvgIcon} from '../common'
import {getThemeProp} from '../common/helpers'
import {LogoutContainer} from '../auth'
import Progress from '../common/Progress'

const MessageWrapper = styled.div`
    grid-area: statusmessage;
    @media ${getThemeProp(['breakpoints', 'phone'], 'screen and (max-width: 599px)')} {
        display: none;
    }
    @media ${getThemeProp(['breakpoints', 'tablet'], 'screen and (min-width: 600px)')} {
        display: grid;
        align-content: center;
        align-items: center;
        justify-content: center;
        justify-items: center;
        overflow: hidden;
        color: ${getThemeProp(['colors', 'misc', 'gray', 'spanishGray'], 'mediumgray')};
        font-size: ${getThemeProp(['fonts', 'fontSize'], '12px')};
        transition: transform 0.4s ease;
        transform: translate(0, ${props => ((props.hasMessage && !props.fadingOutMessage) ? '0' : '-50px')});
    }
`
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
        color: ${getThemeProp(['colors', 'misc', 'gray', 'spanishGray'], 'mediumgray')};
        text-decoration: none;
    }

    @supports (display: grid) {
        display: grid;
        grid-area: pageheader;
        align-items: center;
        align-content: start;
        justify-items: center;
        grid-row-gap: 0;
        grid-template-rows: 48px 2px;
        @media ${getThemeProp(['breakpoints', 'phone'], 'screen and (max-width: 599px)')} {
            grid-template-columns: 20px 112px 1fr 25px 6em;
            grid-template-areas:
                ". headerlogo statusmessage notificationicon logoutlink"
                "pbar pbar pbar pbar pbar";
        }
        @media ${getThemeProp(['breakpoints', 'tablet'], 'screen and (min-width: 600px)')} {
            grid-template-columns: 50px 112px 1fr 25px 8em;
            grid-template-areas:
                ". headerlogo statusmessage notificationicon logoutlink"
                "pbar pbar pbar pbar pbar";
        }
    }
`
const Header = ({className, continuous, progress, fadingOutMessage, statusMessage, logoutCaption, ...restOfProps}) =>
    <ListHeader className={className}>
        <SimpleSvgIcon
          icon="primary"
          width="112"
          height="36"
          className="headerLogo"
        />
        <MessageWrapper fadingOutMessage={fadingOutMessage} hasMessage={!!statusMessage}>
            {statusMessage}
        </MessageWrapper>
        <SimpleSvgIcon
          className="notificationIcon"
          icon="notification"
          width="17"
          height="20"
          fill={getThemeProp(['colors', 'misc', 'gray', 'spanishGray'], 'mediumgray')(restOfProps)}
        />
        <LogoutContainer className="logoutLink" asLink>{logoutCaption}</LogoutContainer>
        <Progress continuous={continuous} progress={progress} styles={{backgroundColor: 'white', height: '2px'}} />
    </ListHeader>

Header.propTypes = {
    className: PropTypes.string.isRequired,
    continuous: PropTypes.bool,
    fadingOutMessage: PropTypes.bool,
    logoutCaption: PropTypes.string.isRequired,
    statusMessage: PropTypes.string,
    progress: PropTypes.number
}

Header.defaultProps = {
    className: 'list-header',
    fadingOutMessage: false,
    logoutCaption: 'Logout'
}

export default withTheme(Header)
