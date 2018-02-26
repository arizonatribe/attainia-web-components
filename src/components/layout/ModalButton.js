import React from 'react'
import Modal from './Modal'
import ModalChild from './ModalChild'
import {Button} from '../common'

const ModalButton = () =>
    <Modal
      closeOnEsc
      closeOnOutsideClick
      node={document && document.getElementById('modal-root')}
    >
        {({ openPortal, closePortal, portal }) => [
            <Button key="open-modal" onClick={openPortal}>
            Open Modal
            </Button>,
            portal(<ModalChild closePortal={closePortal} />)
        ]}
    </Modal>

export default ModalButton