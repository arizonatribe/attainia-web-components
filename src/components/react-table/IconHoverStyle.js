import styled from 'styled-components'
import {either, prop, pathOr} from 'ramda'

export default styled.div`
    cursor: pointer;
    &:hover {
        svg > g {
            fill: ${pathOr('lightgray', ['theme', 'colors', 'misc', 'gray', 'spanishGray'])};
        }
    }
    & svg > g {
        fill: ${either(prop('fill'), pathOr('silver', ['theme', 'colors', 'misc', 'gray', 'silver']))};
    }
`
