import React from 'react'
import {path} from 'ramda'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Cell} from 'fixed-data-table-2'

import {SimpleSvgIcon} from '../common'

const FlexDiv = styled.div`
    display: flex;
`

const LeftFlexSpan = styled.span`
    align-items: center;
    display: flex;
    flex-grow: 3;
    order: 1;
`

const RightFlexSpan = styled.span`
    display: flex;
    order: 2;
    margin-left: 5px;
    width: 12px;
`

const HeaderLink = styled.a`
    text-decoration: underline;
    width: 100%;
    :hover {
        cursor: pointer;
    }
`

const SortIcon = styled(SimpleSvgIcon)`
    fill: ${path(['theme', 'colors', 'secondary', 'default'])};
`

const flip = ({sortDirection = 'asc'} = {}, needIconName = false) => {
    if (sortDirection === 'asc') {
        return needIconName ? 'triangle_down' : 'desc'
    }

    return needIconName ? 'triangle_up' : 'asc'
}

export default class TooltipHeaderCell extends React.PureComponent {
    render() {
        const {headerData: {key, toolTip, name}, sortData, sortCallback, ...props} = this.props

        return (
            <Cell {...props} data-tip={toolTip} data-for={'header-tooltip'}>
                <FlexDiv>
                    <LeftFlexSpan>
                        <HeaderLink onClick={() => sortCallback(key, flip(sortData))}>{name}</HeaderLink>
                    </LeftFlexSpan>
                    <RightFlexSpan>
                        {sortData.columnKey === key ? <SortIcon icon={flip(sortData, true)} /> : null}
                    </RightFlexSpan>
                </FlexDiv>
            </Cell>
        )
    }
}

TooltipHeaderCell.propTypes = {
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
