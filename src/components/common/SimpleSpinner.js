import {pathOr} from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/* eslint-disable indent */
const SimpleSpinner = styled.div`
    position: relative;
    opacity: 0.9;
    @keyframes spinner {
        to {transform: rotate(360deg);}
    }
     
    &:before {
            content: '';
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 50%;
            width: ${(props) => props.size}px;
            height: ${(props) => props.size}px;
            margin-top: -${(props) => props.size / 2}px;
            margin-left: -${(props) => props.size / 2}px;
            border: 2px solid ${(props) => pathOr('lightgray', ['theme', 'colors', 'grayscale', 'lt'])(props)};
            border-top-color: transparent;
            animation: spinner .6s linear infinite;
    }
`

SimpleSpinner.propTypes = {
    size: PropTypes.number
}

SimpleSpinner.defaultProps = {
    secondary: false,
    size: 32
}

export default SimpleSpinner
