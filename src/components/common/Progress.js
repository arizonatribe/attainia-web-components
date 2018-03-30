import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import {__, always, compose, either, is, lte, multiply, pathOr, prop, unless, when} from 'ramda'

const makeProgress = compose(
    when(lte(__, 1), multiply(100)),
    unless(is(Number), always(1)),
    Number,
    prop('progress')
)

const ProgressWrapper = styled.div`
    position: relative;
    width: 100%;
    height: ${pathOr('2px', ['height'])};
    overflow: hidden;
    background-color: ${either(prop('backgroundColor'), pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk']))};
    @supports(display: grid) {
        display: grid;
        grid-area: pbar;
        ${props => props.center && 'justify-items: center;'}
    }
`
const ProgressBar = styled.div`
    height: 100%;
    transition: width .1s linear;
    background-color: ${either(prop('color'), pathOr('crimson', ['theme', 'colors', 'primary', 'default']))};
    width: ${makeProgress}%;
`
const ContinuousProgress = styled.div`
    width: 95%;
    height: 100%;
    position: absolute;
    animation: progression 3s infinite;
    background-color: ${either(prop('color'), pathOr('crimson', ['theme', 'colors', 'primary', 'default']))};
    @keyframes progression {
        from {left: -95%;}
        to {left: 95%;}
    }
`

const Progress = ({progress, center, continuous, styles}) =>
    <ProgressWrapper center={center} {...styles}>
        {continuous ? <ContinuousProgress /> : <ProgressBar progress={progress} {...styles} />}
    </ProgressWrapper>

Progress.propTypes = {
    continuous: PropTypes.bool.isRequired,
    progress: PropTypes.number,
    center: PropTypes.bool,
    styles: PropTypes.shape({
        backgroundColor: PropTypes.string,
        color: PropTypes.string,
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
}

Progress.defaultProps = {
    progress: 0,
    continuous: false
}

export default withTheme(Progress)
