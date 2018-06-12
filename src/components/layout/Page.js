import styled from 'styled-components'
import {getThemeProp} from '../common/helpers'

export default styled.div`
    height: 100%;

    @supports not (display: grid) {
        .header,
        .main,
        .sidebar,
        .footer {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${getThemeProp(['breakpoints', 'phone'], 'screen and (max-width: 599px)')} {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 50px auto 1fr 40px;
            grid-template-areas: 'pageheader' 'sidebar' 'main' 'footer';
        }

        @media ${getThemeProp(['breakpoints', 'tablet'], 'screen and (min-width: 600px)')} {
            display: grid;
            grid-template-columns: ${props => (props.isCollapsed ? '60px' : '200px')} 1fr;
            grid-template-rows: 50px 1fr 40px;
            grid-template-areas:
                'pageheader pageheader'
                'sidebar main'
                'sidebar footer';
        }
    }
`
