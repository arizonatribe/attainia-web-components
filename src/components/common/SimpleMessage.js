import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import {getThemeProp} from './helpers'

const SimpleWrapper = styled.div`
    display: grid;
    align-content: center;
    justify-items: center;
    justify-content: center;
    grid-area: simplemessage;
    font-size: ${getThemeProp(['fonts', 'fontSize'], '12px')};
    color: ${getThemeProp(['colors', 'primary', 'default'], 'crimson')};
    background-color: ${getThemeProp(['colors', 'grayscale', 'dk'], 'darkgray')};
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
