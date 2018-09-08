import React from 'react'

import PropTypes from 'prop-types'
import {Cell} from 'fixed-data-table-2'
import SimpleSvgIcon from '../common/SimpleSvgIcon'

export default class IconLinkCell extends React.PureComponent {
  render() {
    const {cellData: {link, iconName}, ...props} = this.props
    return (
      <Cell {...props}>
        <a href={link}>
          <SimpleSvgIcon
            icon={iconName}
            fill="#0072CE"
          />
        </a>
      </Cell>
    )
  }
}

IconLinkCell.propTypes = {
  cellData: PropTypes.shape({
    link: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired
  }).isRequired
}
