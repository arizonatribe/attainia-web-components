import {pathOr} from 'ramda'
import styled from 'styled-components'

export default styled.div`
    z-index: ${props => props.zIndex || 9999};
    background-color: ${pathOr('crimson', ['theme', 'colors', 'status', 'error'])};
    width: 100%;
    color: white;
    position: absolute;
    bottom: -20px;
    font-size: 10px;
    min-height: 20px;
    max-height: 20px;
    line-height: 20px;
    text-align: center;
`
