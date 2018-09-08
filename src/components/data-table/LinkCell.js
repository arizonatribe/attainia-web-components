import React from 'react'
import {path} from 'ramda'
import styled from 'styled-components'
import color from 'color'

import PropTypes from 'prop-types'
import {Cell} from 'fixed-data-table-2'

const StyledAnchor = styled.a`
    color: ${path(['theme', 'colors', 'secondary', 'default'])};
    &:active {
        color: ${path(['theme', 'colors', 'secondary', 'lt'])};
    }
    &:hover {
        color: ${props =>
    color(
      path(['theme', 'colors', 'secondary', 'lt'])(props)
    ).lighten(0.1).hex()
};
    }
    &:visited {
        color: ${path(['theme', 'colors', 'secondary', 'dk'])};
    }
`

export default class LinkCell extends React.PureComponent {
  render() {
    const {cellData: {link, label}, ...props} = this.props
    return (
      <Cell {...props}>
        <StyledAnchor href={link}>{label}</StyledAnchor>
      </Cell>
    )
  }
}

LinkCell.propTypes = {
  cellData: PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired
}
