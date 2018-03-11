import styled from 'styled-components'

export default styled.div`
    @supports not (display: grid) {
        display: flex;
    }

    @supports (display: grid) {
        display: grid;
    }

    align-items: center;
    height: 100%;
    width: 100%;
`
