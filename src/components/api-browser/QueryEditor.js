import 'graphiql/graphiql.css'
import React from 'react'
import GraphiQL from 'graphiql'
import PropTypes from 'prop-types'
import SimpleSvgIcon from '../common/SimpleSvgIcon'

const QueryEditor = ({fetcher, ...restOfProps}) =>
    <GraphiQL fetcher={fetcher} {...restOfProps}>
        <GraphiQL.Logo>
            <SimpleSvgIcon icon="primary" />
        </GraphiQL.Logo>
    </GraphiQL>

QueryEditor.propTypes = {
    fetcher: PropTypes.func.isRequired
}

export default QueryEditor
