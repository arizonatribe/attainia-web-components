import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {Button} from '../common'

const StyledModal = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledModalContent = styled.div`
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */

    .close-modal {
        display: block;
        margin: auto;
    }
`

const ModalChild = ({closePortal}) =>
    <StyledModal>
        <StyledModalContent>
            <h1>You've opened a Modal</h1>
            <Button className="close-modal" onClick={closePortal}>Close Modal</Button>
        </StyledModalContent>
    </StyledModal>

ModalChild.propTypes = {
    closePortal: PropTypes.func
}

export default ModalChild