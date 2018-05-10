import {T} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Conditional} from '../common'
import NextPageButton from './NextPageButton'
import PreviousPageButton from './PreviousPageButton'

const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    grid-area: paging-buttons;
    grid-template-columns: repeat(2, minmax(min-content, 10em));
    grid-template-areas: 'previouspage nextpage';
    grid-column-gap: 2.5em;
`

const PagingButtons = ({inProgress, isLastPage, isFirstPage, nextPage, prevPage}) =>
    <Wrapper>
        <Conditional condition={!isFirstPage}>
            <PreviousPageButton inProgress={inProgress} type="button" onClick={prevPage} />
        </Conditional>
        <Conditional condition={!isLastPage}>
            <NextPageButton inProgress={inProgress} type="button" onClick={nextPage} />
        </Conditional>
    </Wrapper>

PagingButtons.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    isFirstPage: PropTypes.bool.isRequired,
    isLastPage: PropTypes.bool.isRequired,
    nextPage: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired
}

PagingButtons.defaultProps = {
    inProgress: false,
    isFirstPage: false,
    isLastPage: false,
    nextPage: T,
    prevPage: T
}

export default PagingButtons
