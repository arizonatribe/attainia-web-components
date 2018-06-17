import React, {createContext, PureComponent} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import ReactTable from 'react-table'
import debounce from 'lodash.debounce'
import styled, {withTheme} from 'styled-components'
import {getId, capitalize, isPlainObj} from 'attasist'
import {
    always,
    both,
    compose,
    cond,
    curry,
    defaultTo,
    is,
    keys,
    filter,
    omit,
    pathOr,
    prop,
    replace,
    toLower,
    when,
    whereEq,
    T
} from 'ramda'

import BasicSearch from './BasicSearch'
import PagingButtons from './PagingButtons'
import IconHoverStyle from './IconHoverStyle'
import ReactTableStyle from './ReactTableStyle'
import {SimpleSvgIcon, Button} from '../common'
import AddButtonStyle from './AddButtonStyle'
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
    align-items: center;
    align-content: center;
    grid-column-gap: 0.8em;
    grid-template-areas: '${cond([
        [both(prop('hasTitle'), prop('hasAddButton')), always('title add')],
        [prop('hasAddButton'), always('add')],
        [T, always('title')]
    ])}';
`
/* eslint-disable indent */
const ListStyle = styled.div`
    padding: 1.6rem;
    grid-gap: 1em;
    display: grid;
    grid-template-columns: auto auto 0.75fr 0.25fr;
    grid-template-areas: 
        ${props => !props.noHeader && '"header   header          header header"'}
        'search   search          search ${props => (props.hasFilters ? 'filter' : 'search')}'
        'table    table           table  table'
        '  .      paging-buttons    .      .  ';
    @media ${pathOr('screen and (min-width: 900px)', ['theme', 'breakpoints', 'tabletLandscape'])} {
        grid-template-columns: auto repeat(4, 1fr) 2em;
        grid-template-areas:
            '${p => (p.noHeader ? 'search' : 'header')} search search search search ${
                p => (p.hasFilters ? 'filter' : 'search')
            }'
            'table  table  table  table  table table'
            'paging-buttons paging-buttons paging-buttons paging-buttons paging-buttons paging-buttons';
    }
`
/* eslint-enable indent */
const FilterStyle = styled.div`
    align-self: center;
    grid-area: filter;
`
const Title = styled.h1`
    padding: 0;
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
    & .icon-export {
        grid-area: icon-export;
        justify-self: end;
    }
    & .icon-print {
        grid-area: icon-print;
        justify-self: end;
    }
`
const TableStyle = ReactTableStyle.extend`
    grid-area: ltable;
    .rt-tr {
        text-decoration: none;
    }
`

const noFilters = curry(
    (defaults, filters) => whereEq(
        omit(['page', 'page_size'], defaults),
        omit(['page', 'page_size'], filters)
    )
)

class List extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {search: '', ...props.filters}
        this.noFilters = noFilters(props.filterDefaults || {})
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
    componentWillUpate(nextProps) {
        if (
            this.props.queryType !== nextProps.queryType ||
            (nextProps.shouldFetch && nextProps.shouldFetch !== this.props.shouldFetch)
        ) {
            this.props.findList(this.state, nextProps.queryType)
        }
    }
    applyFilters = (filterProps) => this.setState(
        state => ({...omit(keys(filterProps), state), ...filterProps}),
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
                page_size: this.props.searchResults.length || this.props.rows.length || 10
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
            noTitle,
            currentPage,
            searchResults,
            getTdProps,
            getTrProps,
            matchProp,
            renderAddButton,
            renderAdditionalFilters,
            canLoadMore,
            hasAddButton,
            isLoadingMore
        } = this.props
        const entityName = toLower(this.props.entityName || 'item')
        const entityDisplayName = capitalize(pluralize(entityName))
        const results = this.noFilters(this.state) ? rows : searchResults
        return (
            <ListContext.Provider value={this.state}>
                <ListStyle hasFilters={!!renderAdditionalFilters} noHeader={!hasAddButton && noTitle}>
                    <HeaderStyle hasAddButton={hasAddButton} hasTitle={!noTitle}>
                        {!noTitle && <Title>{entityDisplayName}</Title>}
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
                                {filters => renderAdditionalFilters({
                                    filters,
                                    applyFilters: this.applyFilters,
                                    noFilters: this.noFilters(filters)
                                })}
                            </ListContext.Consumer>
                        </FilterStyle>
                    }
                    <TableWrapper>
                        <Totals>
                            {createTotalsCaption('displaying', entityName)(results.length)}
                        </Totals>
                        <IconHoverStyle className="icon-export">
                            <SimpleSvgIcon
                              icon="export"
                              width="24"
                              height="18"
                              fill={pathOr('silver', ['theme', 'colors', 'grayscale', 'silver'])(this.props)}
                              onClick={this.exportList}
                            />
                        </IconHoverStyle>
                        <IconHoverStyle className="icon-print">
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
                              data={results}
                              columns={columns}
                              noDataText={`No ${entityDisplayName} found.`}
                              pageSize={results.length || 10}
                              showPagination={false}
                              className="-striped"
                              getTdProps={getTdProps || createIdForDetailColumn(matchProp)}
                              getTrProps={getTrProps || always({})}
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
    noTitle: PropTypes.bool,
    exportList: PropTypes.func,
    findList: PropTypes.func.isRequired,
    getTdProps: PropTypes.func,
    getTrProps: PropTypes.func,
    shouldFetch: PropTypes.bool,
    history: PropTypes.shape({push: PropTypes.func}),
    currentPage: PropTypes.number.isRequired,
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
    filterDefaults: PropTypes.shape({
        search: PropTypes.string
    }),
    renderAddButton: PropTypes.func,
    renderAdditionalFilters: PropTypes.func,
    handleTableClick: PropTypes.func
}

List.defaultProps = {
    noTitle: false,
    queryType: '',
    entityName: 'item',
    matchProp: 'name',
    canLoadMore: false,
    hasAddButton: true,
    isLoadingMore: false,
    shouldFetch: false,
    currentPage: 1,
    rows: [],
    columns: [],
    searchResults: [],
    filters: {search: '', page: 1, page_size: 10},
    filterDefaults: {search: ''},
    // eslint-disable-next-line react/prop-types
    renderAddButton: ({entityName}) =>
        <AddButtonStyle>
            <Link to={`/${makeUrlSegment(entityName)}/new`}>
                <Button secondary />
            </Link>
        </AddButtonStyle>
}

export default withRouter(withTheme(List))
