import uuid from 'uuid/v4'

import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Table, Column, Cell} from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'
import color from 'color'

import ColumnType from './ColumnType'
import Button from '../common/Button'
import TooltipHeaderCell from './TooltipHeaderCell'
import NumberTooltipHeaderCell from './NumberTooltipHeaderCell'
import TextCell from './TextCell'
import LinkCell from './LinkCell'
import NumberCell from './NumberCell'
import InfoIconToolTipTextCell from './InfoIconToolTipTextCell'
import ImageCell from './ImageCell'
import IconLinkCell from './IconLinkCell'
import {getThemeProp} from '../common/helpers'


const StyledTable = styled(Table)`
    .fixedDataTableCellLayout_wrap1 {
        height: 100%;
    }
    .fixedDataTableCellLayout_wrap1 span::selection {
        background-color: ${getThemeProp(['colors', 'primary', 'lt'])};
        color: white;
    }
    .public_fixedDataTable_bodyRow:hover .public_fixedDataTableCell_main {
        background-color: ${props =>
        color(
            getThemeProp(['colors', 'grayscale', 'lt'])(props)
        ).mix(
            color(getThemeProp(['colors', 'grayscale', 'md'])(props)), 0.1
        ).hex()
};
    }
    .public_fixedDataTableRow_highlighted {
        background-color: ${getThemeProp(['colors', 'grayscale', 'lt'])};
    }
`

const TableHeader = styled.div`
    border: 1px solid ${props =>
        color(
            getThemeProp(['colors', 'grayscale', 'lt'])(props)
        ).darken(0.1).hex()
};
    border-bottom-style: none;
    padding: 8px;

    .header-checkbox {
        margin-right: 16px;
    }
`

const TableFooter = styled.div`
    border: 1px solid ${props =>
        color(
            getThemeProp(['colors', 'grayscale', 'lt'])(props)
        ).darken(0.1).hex()
};
    border-top-style: none;
    padding: 8px;
    align-items: center;
    display: flex;
`

const LoadMoreButton = styled(Button)`
    width: 50%;
    height: 40px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px 0;
    background-color: ${getThemeProp(['colors', 'secondary', 'default'])};

    &:disabled {
        background: #C1CDD7;
        cursor: not-allowed;
    }
`

const RenderColumns = (headers, data, sortData, getSortedData) => (
    headers.map((header) => {
        switch (header.columnType) {
            case ColumnType.TEXT: {
                return <Column
                  key={uuid()}
                  header={<TooltipHeaderCell headerData={header} sortData={sortData} sortCallback={getSortedData} />}
                  columnKey={header.key}
                  cell={({rowIndex, columnKey}) => (<TextCell cellData={data.rows[rowIndex][columnKey]} />)}
                  width={header.width}
                  fixed={header.fixed}
                />
            }
            case ColumnType.NUMBER: {
                return <Column
                  key={uuid()}
                  header={
                      <NumberTooltipHeaderCell
                        headerData={header}
                        sortData={sortData}
                        sortCallback={getSortedData}
                      />
                  }
                  columnKey={header.key}
                  cell={({rowIndex, columnKey}) => (<NumberCell cellData={data.rows[rowIndex][columnKey]} />)}
                  width={header.width}
                  fixed={header.fixed}
                />
            }
            case ColumnType.LINK: {
                return <Column
                  key={uuid()}
                  header={<TooltipHeaderCell headerData={header} sortData={sortData} sortCallback={getSortedData} />}
                  columnKey={header.key}
                  cell={({rowIndex, columnKey}) => (<LinkCell cellData={data.rows[rowIndex][columnKey]} />)}
                  width={header.width}
                  fixed={header.fixed}
                />
            }
            case ColumnType.IMAGE: {
                return <Column
                  key={uuid()}
                  header={<TooltipHeaderCell headerData={header} sortData={sortData} sortCallback={getSortedData} />}
                  columnKey={header.key}
                  cell={({rowIndex, columnKey}) => (<ImageCell cellData={data.rows[rowIndex][columnKey]} />)}
                  width={header.width}
                  fixed={header.fixed}
                />
            }
            case ColumnType.ICON_LINK: {
                return <Column
                  key={uuid()}
                  header={<TooltipHeaderCell headerData={header} sortData={sortData} sortCallback={getSortedData} />}
                  columnKey={header.key}
                  cell={({rowIndex, columnKey}) => (<IconLinkCell cellData={data.rows[rowIndex][columnKey]} />)}
                  width={header.width}
                  fixed={header.fixed}
                />
            }
            case ColumnType.INFO_TEXT: {
                return <Column
                  key={uuid()}
                  header={<TooltipHeaderCell headerData={header} sortData={sortData} sortCallback={getSortedData} />}
                  columnKey={header.key}
                  cell={({rowIndex, columnKey}) => (
                      <InfoIconToolTipTextCell
                        cellData={data.rows[rowIndex][columnKey]}
                      />
                  )}
                  width={header.width}
                  fixed={header.fixed}
                />
            }
            // no default
        }

        return <Column
          key={uuid()}
          header={<TooltipHeaderCell data={header} sortData={sortData} sortCallback={getSortedData} />}
          columnKey={header.key}
          cell={<TextCell data={data} />}
          width={header.width}
          fixed={header.fixed}
        />
    })
)

const RenderCheckColumn = (hasCheckColumn, rowSelected, data) => {
    let checkColumn

    const handleCheck = (index) => {
        const selected = (typeof data === 'undefined') ? false : !data.rows[index].selected
        rowSelected(index, selected)
    }

    const isChecked = (index) => {
        const checked = (typeof data === 'undefined') ? false : data.rows[index].selected
        return checked
    }

    if (hasCheckColumn) {
        checkColumn = (
            <Column
              header={<Cell />}
              cell={({rowIndex}) => (
                  <Cell>
                      <input
                        type="checkbox"
                        onChange={() => handleCheck(rowIndex)}
                        checked={isChecked(rowIndex)}
                      />
                  </Cell>
              )}
              width={35}
              fixed
            />
        )
    }

    return checkColumn
}

const handleNextPage = (pageData, pageCallBack) => {
    pageCallBack(pageData.page + 1)
}

const DataTable = ({
    rowHeight,
    tableWidth,
    tableHeight,
    headerHeight,
    hasCheckColumn,
    rowSelected,
    getNextPage,
    getSortedData,
    headers,
    data
}) =>
    <div>
        <TableHeader>{data.rows.length} total</TableHeader>
        <StyledTable
          rowsCount={data.rows.length}
          rowHeight={rowHeight}
          width={tableWidth}
          height={tableHeight}
          headerHeight={headerHeight}
        >
            {RenderCheckColumn(hasCheckColumn, rowSelected, data)}
            {RenderColumns(headers, data, data.sortData, getSortedData)}
        </StyledTable>
        <ReactTooltip place="top" id="header-tooltip" effect="solid" />
        <ReactTooltip place="top" id="cell-tooltip" effect="solid" />
        <TableFooter>
            <LoadMoreButton
              onClick={() => handleNextPage(data.pageData, getNextPage)}
              disabled={data.pageData.totalPages === data.pageData.page}
            >
                Load More
            </LoadMoreButton>
        </TableFooter>
    </div>

DataTable.displayName = 'DataTable'
DataTable.propTypes = {
    rowHeight: PropTypes.number.isRequired,
    tableWidth: PropTypes.number.isRequired,
    tableHeight: PropTypes.number.isRequired,
    headerHeight: PropTypes.number.isRequired,
    hasCheckColumn: PropTypes.bool.isRequired,
    rowSelected: PropTypes.func.isRequired,
    getNextPage: PropTypes.func.isRequired,
    getSortedData: PropTypes.func.isRequired,
    headers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            toolTip: PropTypes.string,
            key: PropTypes.string,
            width: PropTypes.number,
            fixed: PropTypes.bool,
            columnType: PropTypes.symbol
        }),
    ).isRequired,
    data: PropTypes.shape({
        sortData: PropTypes.shape({
            columnKey: PropTypes.string,
            sortDirection: PropTypes.string
        }),
        pageData: PropTypes.shape({
            page: PropTypes.number,
            totalPages: PropTypes.number,
            pageSize: PropTypes.number,
            totalResults: PropTypes.number
        }),
        rows: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
}

export default DataTable
