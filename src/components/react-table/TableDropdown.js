import React from 'react'
import PropTypes from 'prop-types'
import DropdownList from 'react-widgets/lib/DropdownList'
import {compose} from 'ramda'
import {WithDropdownArrow} from '../common/DropdownArrow'
import TableFieldWrapperHoC from './TableFieldWrapperHoC'
import TableFieldWithState from './TableFieldWithState'

const types = {
    choices: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    )
}

const onChangeWrapper = (name, choices, onChange) => choice => {
    onChange({target: {name, value: choice.value}, persist() {}})
}

const onBlurWrapper = (name, choices, choice, onBlur) => () => {
    onBlur({target: {name, value: choice}, persist() {}})
}

export const Dropdown = ({name, choices, value, onChange, onBlur}) => (
    <WithDropdownArrow>
        <DropdownList
          data={choices}
          valueField="value"
          textField="text"
          value={value}
          onChange={onChangeWrapper(name, choices, onChange)}
          onBlur={onBlurWrapper(name, choices, value, onBlur)}
        />
    </WithDropdownArrow>
)

Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    choices: types.choices
}

Dropdown.displayName = 'Dropdown'

const TableDropdown = compose(TableFieldWithState, TableFieldWrapperHoC)(Dropdown)

TableDropdown.propTypes = {
    name: PropTypes.string.isRequired,
    choices: types.choices.isRequired,
    validation: PropTypes.arrayOf(PropTypes.array)
}

TableDropdown.displayName = 'TableDropdown'

export default TableDropdown
