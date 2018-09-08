import React from 'react'

import PropTypes from 'prop-types'

import {Cell} from 'fixed-data-table-2'


export default class TextCell extends React.PureComponent {
  render() {
    const {cellData, ...props} = this.props
    return (
      <Cell {...props}>
        <span>{cellData}</span>
      </Cell>
    )
  }
}

TextCell.propTypes = {
  cellData: PropTypes.string.isRequired
}
