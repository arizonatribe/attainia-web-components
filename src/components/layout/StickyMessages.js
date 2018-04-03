import React from 'react'
import PropTypes from 'prop-types'
import {Portal} from 'react-portal'
import {either, pathOr, prop, propOr} from 'ramda'
import styled, {withTheme} from 'styled-components'

const DetachedPosition = styled.div`
  position: relative;
  z-index: 999;
`

const MessageWrapper = styled.section`
    height: 50px;
    max-width: 30em;
    min-width: 30em;
    left: 50%;
    bottom: 0;
    opacity: 0.97;
    position: fixed;
    margin-left: -15em;

    cursor: pointer;
    display: grid;
    text-align: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
    grid-area: messagewrapper;

    transition: transform 0.3s ease;
    transform: translate(0, ${props => (props.hasMessage ? '0' : '50px')});

    font-weight: ${propOr('bold', 'fontWeight')};
    font-size: ${either(prop('fontSize'), pathOr('12px', ['theme', 'fonts', 'fontSize']))};
    color: ${either(prop('color'), pathOr('crimson', ['theme', 'colors', 'primary', 'default']))};
    background-color: ${either(prop('backgroundColor'), pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk']))};
`

const MessageText = styled.p`
    font-size: 1em;
    display: block;
    grid-area: messagetext;
`

const StickyMessages = ({styles, message, clearMessage}) =>
    <DetachedPosition>
        <Portal node={document.getElementById('message-root')} key="sticky-messages">
            <MessageWrapper onClick={clearMessage} hasMessage={!!message} {...styles}>
                <MessageText>{message}</MessageText>
            </MessageWrapper>
        </Portal>
    </DetachedPosition>

StickyMessages.propTypes = {
    message: PropTypes.string,
    clearMessage: PropTypes.func,
    styles: PropTypes.shape({
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        fontSize: PropTypes.string,
        fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
}

StickyMessages.defaultProps = {
    styles: {},
    clearMessage: () => null
}

export default withTheme(StickyMessages)
