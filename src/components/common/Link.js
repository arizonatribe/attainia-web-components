import {pathOr} from 'ramda'
import styled from 'styled-components'

export default styled.a`
    color: ${pathOr('royalblue', ['theme', 'colors', 'secondary', 'dk'])};
    text-decoration: underline;
    font-size: ${pathOr('12px', ['theme', 'fonts', 'fontSize'])};
    &:focus {
        outline: none;
    }
`
