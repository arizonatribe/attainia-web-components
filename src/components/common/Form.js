import styled from 'styled-components'
import {getThemeProp} from './helpers'

export default styled.form`
    background: ${getThemeProp(['colors', 'grayscale', 'lt'], 'lightgray')};
    min-width: ${getThemeProp(['forms', 'smallFormWidth'], '300px')};
    max-width: ${getThemeProp(['forms', 'smallFormWidth'], '300px')};
    margin: 0 auto;
    border-radius: 4px;
    box-sizing: border-box;
    padding-bottom: 10px;
`
