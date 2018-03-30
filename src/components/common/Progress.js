import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ReactInterval from 'react-interval'
import styled, {withTheme} from 'styled-components'
import {__, always, compose, either, is, lte, multiply, pathOr, prop, unless, when} from 'ramda'

const makeProgress = compose(
    when(lte(__, 1), multiply(100)),
    unless(is(Number), always(1)),
    Number,
    prop('progress')
)

const ProgressWrapper = styled.div`
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
    transition: width .2s ease;
    background-color: ${either(prop('color'), pathOr('crimson', ['theme', 'colors', 'primary', 'default']))};
    width: ${makeProgress}%;
`

class CProgress extends PureComponent {
    state = {
        progress: 0
    }
    generateProgress = () => this.setState({progress: this.state.progress >= 100 ? 0 : this.state.progress + 1})
    render() {
        return (
            <ProgressWrapper center={this.props.center} {...this.props.styles}>
                <ReactInterval timeout={100} enabled={this.props.inProgress} callback={this.generateProgress} />
                <ProgressBar progress={this.state.progress} {...this.props.styles} />
            </ProgressWrapper>
        )
    }
}

CProgress.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    center: PropTypes.bool,
    styles: PropTypes.shape({
        backgroundColor: PropTypes.string,
        color: PropTypes.string,
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
}

CProgress.defaultProps = {
    inProgress: false
}

const Progress = ({progress, center, styles}) =>
    <ProgressWrapper center={center} {...styles}>
        <ProgressBar progress={progress} {...styles} />
    </ProgressWrapper>

Progress.propTypes = {
    progress: PropTypes.number,
    center: PropTypes.bool,
    styles: PropTypes.shape({
        backgroundColor: PropTypes.string,
        color: PropTypes.string,
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
}

Progress.defaultProps = {
    progress: 0
}

export const ContinuousProgress = withTheme(CProgress)
export default withTheme(Progress)
