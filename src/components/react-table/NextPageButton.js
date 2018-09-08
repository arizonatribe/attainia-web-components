import PropTypes from 'prop-types'
import styled from 'styled-components'
import {always, either, path, pathOr, prop} from 'ramda'
import SpinningButton from '../common/SpinningButton'

const NextPageButton = styled(SpinningButton)`
    grid-area: nextpage;
    padding: ${either(path(['styles', 'padding']), always('0.5em'))};
    ${props => props.inProgress && `
        color: ${pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk'])(props)};
        background-color: ${pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk'])(props)};
    `}
    &::after {
        content: "${prop('caption')}"
    }
`

NextPageButton.propTypes = {
  caption: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
  size: PropTypes.number.isRequired,
  styles: PropTypes.shape({
    color: PropTypes.string,
    padding: PropTypes.string,
    backgroundColor: PropTypes.string
  })
}

NextPageButton.defaultProps = {
  caption: 'Next Page',
  secondary: true,
  size: 16,
  styles: {}
}

export default NextPageButton
