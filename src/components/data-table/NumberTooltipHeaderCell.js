import PropTypes from 'prop-types'

import styled from 'styled-components'

import TooltipHeaderCell from './TooltipHeaderCell'


const NumberTooltipHeaderCell = styled(TooltipHeaderCell)`
    .public_fixedDataTableCell_cellContent span a {
        text-align: right;
    }
`

NumberTooltipHeaderCell.propTypes = {
  headerData: PropTypes.shape({
    name: PropTypes.string,
    toolTip: PropTypes.string,
    key: PropTypes.string,
    width: PropTypes.number,
    fixed: PropTypes.bool,
    columnType: PropTypes.symbol
  }
  ).isRequired,
  sortData: PropTypes.shape({
    columnKey: PropTypes.string,
    sortDirection: PropTypes.string
  }),
  sortCallback: PropTypes.func
}

export default NumberTooltipHeaderCell
