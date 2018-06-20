import React from 'react'
import {pathOr} from 'ramda'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'

const SimpleWrapper = styled.div`
    display: grid;
    align-content: center;
    justify-items: center;
    justify-content: center;
    grid-area: simplemessage;
    font-size: ${pathOr('12px', ['theme', 'fonts', 'fontSize'])};
    color: ${pathOr('crimson', ['theme', 'colors', 'primary', 'default'])};
    background-color: ${pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk'])};
`

const SimpleMessage = ({className, message, ...restOfProps}) =>
    <SimpleWrapper className={className} {...restOfProps}>{message}</SimpleWrapper>

SimpleMessage.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string
}

SimpleMessage.defaultProps = {
    className: 'simple-message'
}

export default withTheme(SimpleMessage)
