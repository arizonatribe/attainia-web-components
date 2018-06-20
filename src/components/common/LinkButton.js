import {pathOr} from 'ramda'
import styled from 'styled-components'
import Button from './Button'

export default styled(Button)`
    & > a {
        text-decoration: none;
        color: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
        font-size: ${pathOr('12px', ['theme', 'fonts', 'fontSize'])};
    }
`
