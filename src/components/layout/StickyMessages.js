import React from 'react'
import {etc} from 'attasist'
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

    display: grid;
    text-align: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
    grid-area: messagewrapper;
    grid-template-columns: 1fr 6em;
    grid-template-areas: "messagetext dismissmessage";

    transition: transform 0.3s ease;
    transform: translate(0, ${props => (props.hasMessage ? '0' : '50px')});

    font-weight: ${propOr('bold', 'fontWeight')};
    font-size: ${either(prop('fontSize'), pathOr('12px', ['theme', 'fonts', 'fontSize']))};
    color: ${either(prop('color'), pathOr('white', ['theme', 'colors', 'grayscale', 'white']))};
    background-color: ${either(prop('backgroundColor'), pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk']))};
`

const DismissButton = styled.p`
    font-size: 1em;
    display: block;
    cursor: pointer;
    grid-area: dismissmessage;
    color: ${pathOr('crimson', ['theme', 'colors', 'primary', 'default'])};
    &:after {
        content: 'DISMISS';
    }
`
const MessageText = styled.p`
    font-size: 1em;
    display: block;
    grid-area: messagetext;
`

const StickyMessages = ({styles, message, clearMessage}) =>
    <DetachedPosition>
        <Portal node={document.getElementById('message-root')} key="sticky-messages">
            <MessageWrapper hasMessage={!!message} {...styles}>
                <MessageText>{etc(88)(message)}</MessageText>
                <DismissButton onClick={clearMessage} />
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
    message: '',
    styles: {},
    clearMessage: () => null
}

export default withTheme(StickyMessages)
