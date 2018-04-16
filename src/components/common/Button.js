import PropTypes from 'prop-types'
import styled from 'styled-components'
import {either, path, pathOr} from 'ramda'

const Button = styled.button`
    display: block;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    padding: ${pathOr('15px', ['styles', 'padding'])};

    border: none;
    border-radius: 3px;
    &:focus {
        outline: none;
    }

    font-family: ${pathOr('Arial', ['fonts', 'fontFamily'])};
    font-weight: ${pathOr('bold', ['styles', 'fontWeight'])};
    font-size: ${either(path(['styles', 'fontSize']), pathOr('15px', ['theme', 'fonts', 'fontSize']))};

    color: ${either(path(['styles', 'color']), pathOr('white', ['theme', 'colors', 'grayscale', 'white']))};
    background-color: ${props => (
        path(['styles', 'backgroundColor'])(props) ||
        (props.secondary && path(['theme', 'colors', 'secondary', 'default'])(props)) ||
        path(['theme', 'colors', 'status', props.status])(props) ||
        pathOr('crimson', ['theme', 'colors', 'primary', 'default'])(props)
    )};
    ${props => (
        props.active &&
        path(['styles', 'activeColor'])(props) &&
        `background-color: ${path(['styles', 'activeColor'])(props)};`
    )}
    ${props => (
        props.visited &&
        path(['styles', 'visitedColor'])(props) &&
        `background-color: ${path(['styles', 'visitedColor'])(props)};`
    )}
    ${props => (
        props.disabled &&
        `background-color: ${path(['styles', 'disabledColor'])(props) || 'grey'};`
    )}
    ${props => !props.disabled && !props.visited && path(['styles', 'hoverColor'])(props) && `
        &:hover {
            background-color: ${path(['styles', 'hoverColor'])(props)};
        }
    `}
`

Button.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    visited: PropTypes.bool,
    secondary: PropTypes.bool,
    status: PropTypes.oneOf(['error', 'warning', 'ok', '']).isRequired,
    styles: PropTypes.shape({
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        hoverColor: PropTypes.string,
        activeColor: PropTypes.string,
        disabledColor: PropTypes.string,
        visitedColor: PropTypes.string,
        padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
}

Button.defaultProps = {
    active: false,
    disabled: false,
    secondary: false,
    status: '',
    styles: {},
    visited: false
}

export default Button
