import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ApiList from './ApiList'

const Wrapper = styled.section`
    display: grid;
    height: 100%;
    grid-row-gap: 2em;
    align-items: center;
    justify-items: center;
`

const ApiBrowser = ({apis}) =>
    <Wrapper>
        <ApiList apis={apis} />
    </Wrapper>

ApiBrowser.propTypes = {
    apis: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        avatarSrc: PropTypes.string
    }))
}

export default ApiBrowser
