import React from 'react'
import PropTypes from 'prop-types'
import {mergeSpec} from 'attasist'
import AutoComplete from 'react-autocomplete'
import styled, {withTheme} from 'styled-components'
import {
    always,
    defaultTo,
    identity,
    ifElse,
    is,
    isNil,
    of,
    omit,
    path,
    pathOr,
    pipe,
    prop,
    T,
    unless,
    when
} from 'ramda'
import SimpleSvgIcon from '../common/SimpleSvgIcon'
import {Input} from '../common/InputField'


const getByMatchProp = pipe(unless(is(Array), of), path)

// eslint-disable-next-line react/prop-types
const SearchField = props => <Input type="text" innerRef={props.inputRef} {...props} />

const Grid = styled.div`
    text-align: left;
    display: grid;
    align-content: center;
    grid-template-rows: auto;
    grid-template-columns: auto 3em;
    grid-template-areas: 'bar icon';
`
const Bar = styled.div`
    grid-area: bar;
    border-right: none;
    & > * {
        position: relative;
    }
    input[type='text'] {
        display: block;
        border: 1px solid ${pathOr('lightgray', ['theme', 'colors', 'grayscale', 'lt'])};
    }
`
const MenuItem = styled.div`
    padding: 1.6em;
    border-bottom: 1px solid ${pathOr('lightgray', ['theme', 'colors', 'grayscale', 'lt'])};
    background-color: ${ifElse(
        prop('isHighlighted'),
        pathOr('gray', ['theme', 'colors', 'grayscale', 'md']),
        always('white')
    )};
`
const Icon = styled.div`
    grid-area: icon;
    border: 1px solid ${pathOr('lightgray', ['theme', 'colors', 'grayscale', 'lt'])};
    border-left: none;
    background: white;
    display: grid;
    svg {
        display: block;
        fill: ${pathOr('lightgray', ['theme', 'colors', 'grayscale', 'lt'])};
        justify-self: center;
        align-self: center;
    }
`

const mapPropsToInput = pipe(
    defaultTo({}),
    mergeSpec({
        id: prop('name'),
        inputRef: prop('ref'),
        value: pipe(prop('value'), when(isNil, always('')))
    }),
    omit(['ref'])
)

const menuStyleDefaults = {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    fontSize: '90%',
    left: 0,
    maxHeight: '35em',
    overflowY: 'scroll',
    position: 'absolute',
    padding: '2px 0',
    top: '3em',
    zIndex: 999
}

const BasicSearch = ({
    matchProp, menuStyles, onChange, onSelect,
    renderInput, renderItem, renderMenu,
    searchItems, searchFor, value,
    ...restOfProps
}) =>
    <Grid>
        <Bar>
            <AutoComplete
              autoHighlight={false}
              className="autocomp"
              getItemValue={matchProp ? getByMatchProp(matchProp) : identity}
              inputProps={{placeholder: searchFor}}
              items={searchItems}
              menuStyle={{
                  ...menuStyleDefaults,
                  ...(menuStyles || {})
              }}
              onChange={onChange}
              onSelect={onSelect}
              renderMenu={renderMenu}
              renderItem={renderItem(matchProp)}
              renderInput={renderInput(mapPropsToInput)}
              wrapperStyle={{display: 'block'}}
              value={value}
            />
        </Bar>
        <Icon>
            <SimpleSvgIcon
              icon="search"
              width="20"
              height="20"
              fill={pathOr('gray', ['theme', 'colors', 'grayscale', 'md'])(restOfProps)}
            />
        </Icon>
    </Grid>

BasicSearch.propTypes = {
    matchProp: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    menuStyles: PropTypes.shape({
        background: PropTypes.string,
        border: PropTypes.string,
        borderRadius: PropTypes.string,
        fontSize: PropTypes.string,
        padding: PropTypes.string
    }),
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    value: PropTypes.string,
    renderInput: PropTypes.func,
    renderMenu: PropTypes.func,
    renderItem: PropTypes.func,
    searchItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
    searchFor: PropTypes.string.isRequired
}

BasicSearch.defaultProps = {
    menuStyles: {...menuStyleDefaults},
    onChange: T,
    onSelect: T,
    renderInput: mapProps => props => <SearchField {...mapProps(props)} />,
    renderItem: matchProp => (item, isHighlighted) => (
        <MenuItem key={item.id} isHighlighted={isHighlighted}>
            {matchProp ? getByMatchProp(matchProp)(item) : item}
        </MenuItem>
    ),
    searchItems: [],
    searchFor: 'Search for item'
}

export default withTheme(BasicSearch)
