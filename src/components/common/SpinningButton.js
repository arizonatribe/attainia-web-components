import {pathOr} from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from './Button'

/* eslint-disable indent */
const SpinningButton = styled(Button)`
    position: relative;
    ${props => props.inProgress && 'opacity: 0.9;'}
    ${props => props.inProgress && `background: ${pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk'])(props)};`}
    ${props => props.inProgress && `color: ${pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk'])(props)};`}

    @keyframes spinner {
        to {transform: rotate(360deg);}
    }
     
    &:before {
        ${props => props.inProgress && `
            content: '';
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 50%;
            width: ${props.size}px;
            height: ${props.size}px;
            margin-top: -${props.size / 2}px;
            margin-left: -${props.size / 2}px;
            border: 2px solid ${pathOr('lightgray', ['theme', 'colors', 'grayscale', 'lt'])(props)};
            border-top-color: ${pathOr(
                'crimson', ['theme', 'colors', (props.secondary ? 'secondary' : 'primary'), 'default']
            )(props)};
            animation: spinner .6s linear infinite;
        `}
    }
`
/* eslint-enable indent */

SpinningButton.propTypes = {
  inProgress: PropTypes.bool,
  size: PropTypes.number
}

SpinningButton.defaultProps = {
  inProgress: false,
  secondary: false,
  size: 32
}

export default SpinningButton
