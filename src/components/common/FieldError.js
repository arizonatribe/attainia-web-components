import {pathOr} from 'ramda'
import styled from 'styled-components'

export default styled.div`
    z-index: ${props => props.zIndex || 0};
    width: calc(100% - 1.1em);
    color: ${pathOr('crimson', ['theme', 'colors', 'status', 'error'])};;
    position: absolute;
    bottom: -20px;
    font-size: 10px;
    min-height: 20px;
    max-height: 20px;
    line-height: 20px;
    text-align: left;
    padding-left: 1.1em;
`
