import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Screen = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    &:hover {
        cursor: default;
    }
`

const ModalScreen = ({onClick}) =>
    <Screen onClick={onClick} />

ModalScreen.propTypes = {
    onClick: PropTypes.func.isRequired
}

ModalScreen.defaultProps = {
    onClick: () => {}
}

export default ModalScreen
