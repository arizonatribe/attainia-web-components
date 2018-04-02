import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import SimpleMessage from '../common/SimpleMessage'

const MainContent = styled.div`
    height: 100%;
    display: grid;
    grid-area: maincontent;
    align-items: center;
`
const MainWrapper = styled.main`
    height: 100%;
    position: relative;
    display: grid;
    align-items: end;
    grid-area: main;
    grid-template-areas: "maincontent";

    & .simple-message {
        position: fixed;
        bottom: 0;
        left: 45%;
        width: 30em;
        max-height: 40px;
        min-height: 40px;
        transition: transform 400ms ease;
        transform: translate(0, ${props => (props.hasMessage ? '-40px' : '80px')});
    }
`

const Main = ({children, message, ...restOfProps}) =>
    <MainWrapper hasMessage={!!message}>
        <MainContent>{children}</MainContent>
        <SimpleMessage message={message} {...restOfProps} />
    </MainWrapper>

Main.propTypes = {
    children: PropTypes.node,
    message: PropTypes.string
}

export default withTheme(Main)
