import React from 'react'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {pathOr, pathEq, when} from 'ramda'

const StyledModal = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    align-items: center;
    align-content: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
    cursor: pointer;
    z-index: 9999;
`
const StyledModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    align-content: start;
    justify-items: center;
    background-color: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
    border: 1px solid ${pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk'])};
`

const ModalChild = ({closePortal, children}) => {
  const id = uuid()
  return (
    <StyledModal id={id} onClick={when(pathEq(['target', 'id'], id), closePortal)}>
      <StyledModalContent>{children}</StyledModalContent>
    </StyledModal>
  )
}

ModalChild.propTypes = {
  closePortal: PropTypes.func,
  children: PropTypes.node
}

export default ModalChild
