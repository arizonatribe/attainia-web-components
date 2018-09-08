import React from 'react'

import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Cell} from 'fixed-data-table-2'


const NumberStyledCell = styled(Cell)`
    margin-left: auto;
    margin-right: 13px;
`

export default class NumberCell extends React.PureComponent {
  render() {
    const {cellData, ...props} = this.props
    return (
      <NumberStyledCell {...props}>
        <span>{cellData}</span>
      </NumberStyledCell>
    )
  }
}

NumberCell.propTypes = {
  cellData: PropTypes.number.isRequired
}
