import React from 'react'
import {path} from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Cell} from 'fixed-data-table-2'

import SimpleSvgIcon from '../common/SimpleSvgIcon'


const InlineImg = styled(SimpleSvgIcon)`
    display: inline;
    margin-right: 16px;
    vertical-align: middle;
    fill: ${path(['theme', 'colors', 'secondary', 'default'])};
`

export default class InfoIconToolTipTextCell extends React.PureComponent {
  render() {
    const {cellData: {toolTip, altText, text}, ...props} = this.props
    return (
      <Cell {...props}>
        <InlineImg
          icon="info"
          data-tip={toolTip}
          data-for={'cell-tooltip'}
          alt={altText}
        />
        <span>{text}</span>
      </Cell>
    )
  }
}

InfoIconToolTipTextCell.propTypes = {
  cellData: PropTypes.shape({
    toolTip: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}
