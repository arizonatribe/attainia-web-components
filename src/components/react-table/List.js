import React, {createContext, PureComponent} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import ReactTable from 'react-table'
import debounce from 'lodash.debounce'
import styled, {withTheme} from 'styled-components'
import {getId, capitalize, isPlainObj} from 'attasist'
import {compose, defaultTo, is, isEmpty, filter, pathOr, prop, replace, toLower, when} from 'ramda'

import BasicSearch from './BasicSearch'
import PagingButtons from './PagingButtons'
import IconHoverStyle from './IconHoverStyle'
import ReactTableStyle from './ReactTableStyle'
import {SimpleSvgIcon, Button} from '../common'
import {fuzzyCurry, createIdForDetailColumn, createTotalsCaption} from './helpers'

const ListContext = createContext('list')

const makeUrlSegment = compose(replace(/ /g, '-'), pluralize, toLower, defaultTo('item'))

const Totals = styled.p`
    display: block;
    grid-area: totals;
    font-weight: 400;
    padding: 1em 0;
`
const HeaderStyle = styled.div`
    justify-self: start;
    grid-area: header;
    display: grid;
    grid-column-gap: 0.8em;
    grid-template-areas: 'title ${props => (props.hasAddButton ? 'add' : 'title')}';
`
const ListStyle = styled.div`
    padding: 1.6rem;
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 1fr auto 0.75fr 0.25fr;
    grid-template-areas: 
        'header   header          header header' 
        'search   search          search ${props => (props.hasFilters ? 'filter' : 'search')}'
        'table    table           table  table'
        '  .      paging-buttons    .      .  ';
    @media ${pathOr('screen and (min-width: 900px)', ['theme', 'breakpoints', 'tabletLandscape'])} {
        grid-template-columns: auto repeat(4, 1fr) 2em;
        grid-template-areas:
            'header search search search search ${props => (props.hasFilters ? 'filter' : 'search')}'
            'table  table  table  table  table table'
            'paging-buttons paging-buttons paging-buttons paging-buttons paging-buttons paging-buttons';
    }
`
const FilterStyle = styled.div`
    align-self: center;
    grid-area: filter;
`
const Title = styled.h1`
    font-size: 2em;
    grid-area: title;
`
const SearchStyle = styled.div`
    grid-area: search;
    align-self: center;
`
const TableWrapper = styled.div`
    display: grid;
    grid-area: table;
    align-items: center;
    grid-row-gap: 0.6em;
    grid-template-rows: 3em auto;
    grid-template-columns: 1fr repeat(2, 3em);
    grid-template-areas: 'totals icon-export icon-print' 'ltable ltable ltable';
    & div:nth-child(2) {
        grid-area: icon-export;
        justify-self: end;
    }
    & div:nth-child(3) {
        grid-area: icon-print;
        justify-self: end;
    }
`
const TableStyle = ReactTableStyle.extend`
    grid-area: ltable;
    .rt-tr {
        text-decoration: none;
    }
    .ReactTable {
        overflow: visible;
    }
    .ReactTable .rt-td {
        overflow-x: scroll;
    }
`
const AddButtonStyle = styled.div`
    grid-area: add;
    padding-top: 0.8em;
    a {
        text-decoration: none;
    }
    button {
        font-weight: normal;
        font-size: 1.6em;
        border-radius: 2px;
        padding: 0.25em 0.5em 0.25em 0.5em;
        height: 30px;
        width: 30px;
    }
`

class List extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {search: '', ...props.filters}
    }
    componentWillMount() {
        if (this.props.shouldFetch) this.props.findList(this.state, this.props.queryType)
    }
    onTypeAhead = (event, search) => this.setState(
        state => ({...state, search}),
        () => this.deSearchItemAdded(this.state, 'search')
    )
    onSelect = search => this.setState(
        state => ({...state, search}),
        () => this.props.findList(this.state, 'search')
    )
    applyFilters = (filterProps) => this.setState(
        state => ({...state, ...filterProps}),
        () => this.props.findList(this.state, 'search')
    )
    loadNextPage = () => this.props.findList(
        {...this.state, page: this.props.currentPage + 1},
        this.state.search ? 'search' : this.props.queryType
    )
    loadPreviousPage = () => this.props.findList(
        {...this.state, page: this.props.currentPage - 1},
        this.state.search ? 'search' : this.props.queryType
    )
    exportList = () => {
        if (is(Function, this.props.exportList)) {
            this.props.exportList({
                ...this.state,
                page: this.props.currentPage,
                page_size: this.props.pageSize
            })
        }
    }
    filterAutoComplete = filter(
        name => compose(
            fuzzyCurry(this.state.search),
            when(isPlainObj, prop(this.props.matchProp))
        )(name)
    )
    deSearchItemAdded = debounce(this.props.findList, 200)
    handleTableClick(event) {
        event.preventDefault()
        const id = getId(event)
        if (id) {
            this.props.history.push(`/${makeUrlSegment(this.props.entityName)}/${id}`)
        }
    }

    render() {
        const {
            rows,
            columns,
            pageSize,
            currentPage,
            searchResults,
            getTdProps,
            matchProp,
            renderAddButton,
            renderAdditionalFilters,
            canLoadMore,
            hasAddButton,
            isLoadingMore
        } = this.props
        const entityName = toLower(this.props.entityName || 'item')
        const entityDisplayName = capitalize(pluralize(entityName))
        return (
            <ListContext.Provider value={this.state}>
                <ListStyle hasFilters={!!renderAdditionalFilters}>
                    <HeaderStyle hasAddButton={hasAddButton}>
                        <Title>{entityDisplayName}</Title>
                        {hasAddButton && renderAddButton && renderAddButton(this.props)}
                    </HeaderStyle>
                    <SearchStyle>
                        <BasicSearch
                          matchProp={matchProp}
                          searchFor={`Search for ${entityDisplayName}`}
                          searchItems={this.filterAutoComplete(rows)}
                          onChange={this.onTypeAhead}
                          onSelect={this.onSelect}
                          value={this.state.search}
                        />
                    </SearchStyle>
                    {renderAdditionalFilters &&
                        <FilterStyle>
                            <ListContext.Consumer>
                                {filters => renderAdditionalFilters({filters, applyFilters: this.applyFilters})}
                            </ListContext.Consumer>
                        </FilterStyle>
                    }
                    <TableWrapper>
                        <Totals>
                            {createTotalsCaption('displaying', entityName)(searchResults.length || rows.length)}
                        </Totals>
                        <IconHoverStyle>
                            <SimpleSvgIcon
                              icon="export"
                              width="24"
                              height="18"
                              fill={pathOr('silver', ['theme', 'colors', 'grayscale', 'silver'])(this.props)}
                              onClick={this.exportList}
                            />
                        </IconHoverStyle>
                        <IconHoverStyle>
                            <SimpleSvgIcon
                              icon="print"
                              width="20"
                              height="20"
                              onClick={window.print}
                              fill={pathOr('silver', ['theme', 'colors', 'grayscale', 'silver'])(this.props)}
                            />
                        </IconHoverStyle>
                        <TableStyle onClick={this.props.handleTableClick || this.handleTableClick} >
                            <ReactTable
                              data={isEmpty(searchResults) ? rows : searchResults}
                              columns={columns}
                              noDataText={`No ${entityDisplayName} found.`}
                              pageSize={searchResults.length || rows.length || pageSize}
                              showPagination={false}
                              className="-striped"
                              getTdProps={getTdProps || createIdForDetailColumn(matchProp)}
                            />
                        </TableStyle>
                    </TableWrapper>
                    <PagingButtons
                      inProgress={isLoadingMore}
                      isFirstPage={currentPage === 1}
                      isLastPage={!canLoadMore}
                      nextPage={this.loadNextPage}
                      prevPage={this.loadPreviousPage}
                    />
                </ListStyle>
            </ListContext.Provider>
        )
    }
}

List.propTypes = {
    exportList: PropTypes.func,
    findList: PropTypes.func.isRequired,
    getTdProps: PropTypes.func,
    shouldFetch: PropTypes.bool,
    history: PropTypes.shape({push: PropTypes.func}),
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    canLoadMore: PropTypes.bool,
    hasAddButton: PropTypes.bool,
    isLoadingMore: PropTypes.bool,
    entityName: PropTypes.string.isRequired,
    matchProp: PropTypes.string,
    queryType: PropTypes.string,
    searchResults: PropTypes.arrayOf(PropTypes.object),
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        })
    ),
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            Header: PropTypes.string,
            accessor: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
            width: PropTypes.number
        })
    ),
    filters: PropTypes.shape({
        search: PropTypes.string,
        page: PropTypes.number,
        page_size: PropTypes.number
    }),
    renderAddButton: PropTypes.func,
    renderAdditionalFilters: PropTypes.func,
    handleTableClick: PropTypes.func
}

List.defaultProps = {
    queryType: '',
    entityName: 'item',
    matchProp: 'name',
    canLoadMore: false,
    hasAddButton: true,
    isLoadingMore: false,
    shouldFetch: false,
    currentPage: 1,
    pageSize: 10,
    rows: [],
    columns: [],
    searchResults: [],
    filters: {search: '', page: 1, page_size: 10},
    // eslint-disable-next-line react/prop-types
    renderAddButton: ({entityName}) =>
        <AddButtonStyle>
            <Link to={`/${makeUrlSegment(entityName)}/new`}>
                <Button secondary>+</Button>
            </Link>
        </AddButtonStyle>
}

export default withRouter(withTheme(List))
