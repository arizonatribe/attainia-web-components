import styled from 'styled-components'

export default styled.section`
    width: 100%;
    position: relative;
    background: transparent;

    &::after {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        content: "";
        opacity: 0.3;
        position: absolute;
        ${props => props.src && `background: url(${props.src}) no-repeat;`}
        background-size: 100%;
    }
`
