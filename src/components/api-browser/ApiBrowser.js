import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ApiList from './ApiList'
import QueryEditor from './QueryEditor'

const Wrapper = styled.section`
    display: grid;
    height: 100%;
    grid-row-gap: 2em;
    align-items: center;
    justify-items: center;
`

const ApiBrowser = ({graphQlFetcher}) =>
    <Wrapper>
        <QueryEditor fetcher={graphQlFetcher} />
        <ApiList />
    </Wrapper>

ApiBrowser.propTypes = {
    graphQlFetcher: PropTypes.func.isRequired
}

export default ApiBrowser
