import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Portal} from 'react-portal'

const ModalPosition = styled.div`
  position: relative;
`

const KEYCODES = {
    ESCAPE: 27
}

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.portalNode = null
        this.state = { active: !!props.defaultOpen }
    }

    componentDidMount() {
        if (this.props.closeOnEsc) {
            document.addEventListener('keydown', this.handleKeydown)
        }
    }

    componentWillUnmount() {
        if (this.props.closeOnEsc) {
            document.removeEventListener('keydown', this.handleKeydown)
        }
    }

    openPortal = event => {
        if (this.state.active) {
            return
        }
        if (event && event.nativeEvent) {
            event.nativeEvent.stopImmediatePropagation()
        }
        this.setState({ active: true }, this.props.onOpen)
    }

    closePortal = () => {
        if (!this.state.active) {
            return
        }
        this.setState({ active: false }, this.props.onClose)
    }

    wrapWithPortal = (children) => {
        if (!this.state.active) {
            return null
        }
        return (
            <Portal
              node={this.props.node}
              key="react-portal"
              ref={(portalNode) => { this.portalNode = portalNode }}
            >
                {children}
            </Portal>
        )
    }

    handleKeydown = event => {
        if (event.keyCode === KEYCODES.ESCAPE && this.state.active) {
            this.closePortal()
        }
    }

    render() {
        return (
            <ModalPosition>
                {this.props.children({
                    openPortal: this.openPortal,
                    closePortal: this.closePortal,
                    portal: this.wrapWithPortal,
                    isOpen: this.state.active
                })}
            </ModalPosition>
        )
    }
}

Modal.propTypes = {
    children: PropTypes.func.isRequired,
    defaultOpen: PropTypes.bool,
    closeOnEsc: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    // node can be a div in index.html instead of a React Node.
    node: PropTypes.any // eslint-disable-line react/forbid-prop-types
}

Modal.defaultProps = {
    onOpen: () => {},
    onClose: () => {}
}

export default Modal