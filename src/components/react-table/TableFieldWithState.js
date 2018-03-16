import React, {Component} from 'react'
import PropTypes from 'prop-types'
import spected from 'spected'

export default DecoratedComponent => {
    class TableFieldContainer extends Component {
        constructor(props) {
            super(props)
            this.state = {
                showField: false,
                touched: false,
                errors: this.runValidations(props),
                value: this.props.value
            }
        }
        componentWillReceiveProps(nextProps) {
            this.setState({
                value: nextProps.value,
                errors: this.runValidations(nextProps)
            })
        }

        onStateChange = (nextState) => {
            this.setState({
                ...nextState,
                touched: true,
                errors: this.runValidations(nextState)
            })
        }
        runValidations(nextState) {
            const valueValidation = {
                value: this.props.validation
            }
            const validationResult = spected(valueValidation, nextState)

            if (validationResult.value === true) {
                return false
            }

            return validationResult.value
        }
        render() {
            return <DecoratedComponent {...this.props} state={this.state} onStateChange={this.onStateChange} />
        }
    }

    TableFieldContainer.displayName = `TableFieldContainer(${DecoratedComponent.displayName})`

    TableFieldContainer.propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        validation: PropTypes.arrayOf(PropTypes.array)
    }
    TableFieldContainer.defaultProps = {
        validation: []
    }

    return TableFieldContainer
}
