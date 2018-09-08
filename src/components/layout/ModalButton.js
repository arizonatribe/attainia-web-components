import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Modal from './Modal'
import ModalChild from './ModalChild'
import Button from '../common/Button'

const ModalButtonWrapper = styled.section`
    display: grid;
    grid-area: modalbuttonwrapper;
    align-content: center;
    justify-content: center;
    justify-items: center;
    & > * {
        z-index: 0;
    }
`

const ModalButton = ({caption, children}) =>
  <ModalButtonWrapper>
    <Modal
      closeOnEsc
      closeOnOutsideClick
      node={document && document.getElementById('modal-root')}
    >
      {({ openPortal, closePortal, portal }) => [
        <Button key="open-modal" onClick={openPortal}>{caption}</Button>,
        portal(<ModalChild closePortal={closePortal}>{children}</ModalChild>)
      ]}
    </Modal>
  </ModalButtonWrapper>

ModalButton.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.node
}

ModalButton.defaultProps = {
  caption: 'Open Modal'
}

export default ModalButton
