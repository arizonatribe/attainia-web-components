import PropTypes from 'prop-types'
import styled from 'styled-components'
import {always, either, path, pathOr, prop} from 'ramda'
import SpinningButton from '../common/SpinningButton'

const PreviousPageButton = styled(SpinningButton)`
    grid-area: previouspage;
    padding: ${either(path(['styles', 'padding']), always('0.5em'))};
    ${props => !props.secondary && `background-color: ${
        either(path(['styles', 'backgroundColor']), pathOr('silver', ['theme', 'colors', 'misc', 'silver']))(props)
    };`}
    ${props => props.inProgress && `
        color: ${pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk'])(props)};
        background-color: ${pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk'])(props)};
    `}
    &::after {
        content: "${prop('caption')}"
    }
`

PreviousPageButton.propTypes = {
    caption: PropTypes.string.isRequired,
    secondary: PropTypes.bool,
    size: PropTypes.number.isRequired,
    styles: PropTypes.shape({
        color: PropTypes.string,
        padding: PropTypes.string,
        backgroundColor: PropTypes.string
    })
}

PreviousPageButton.defaultProps = {
    caption: 'Previous Page',
    secondary: false,
    size: 16,
    styles: {}
}

export default PreviousPageButton
