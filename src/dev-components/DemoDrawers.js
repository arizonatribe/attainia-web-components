import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import {pathOr} from 'ramda'
import styled, {withTheme} from 'styled-components'
import {ReactTableStyle} from '../components/react-table'
import mockData from './albums.json'

import {Drawer, HeaderImage, ContentWrapper} from '../components/layout'

const Wrapper = styled.section`
    display: grid;
    padding: 0 2em;
`
const PageWrapper = styled(ContentWrapper)`
    grid-row-gap: 3em;
`
const TableStyle = ReactTableStyle.extend`
    .ReactTable .rt-thead {
        background-color: ${pathOr('darkgray', ['theme', 'colors', 'grayscale', 'dk'])};
        & .rt-th {
            color: white;
            font-weight: bold;
            font-size: 1em;
        }
    }
    .ReactTable.-striped .rt-tr.-even {
        background-color: ghostwhite;
    }
    .ReactTable.-striped .rt-tr.-odd {
        background-color: whitesmoke;
    }
`

const defaultColumns = [{
  Header: 'Album',
  accessor: 'title',
  width: 300
}, {
  Header: 'Artist',
  accessor: 'artist',
  width: 200
}, {
  Header: 'Year',
  accessor: 'year',
  width: 75
}, {
  id: 'genre',
  Header: 'Genre',
  accessor: ({genre = ''}) => genre.join(', '),
  width: 100
}]

const DemoDrawers = ({imgSrc, ...restOfProps}) =>
  <PageWrapper>
    <HeaderImage backgroundImage={imgSrc} height="110px" />
    <Wrapper>
      <Drawer
        title="90s Albums"
        styles={{
          columnGap: '1em',
          backgroundColor: pathOr('crimson', ['theme', 'colors', 'primary', 'default'])(restOfProps)
        }}
        contentStyles={{
          backgroundColor: 'snow',
          border: '1px solid lightgray'
        }}
      >
        <TableStyle>
          <ReactTable
            data={mockData.albums}
            columns={defaultColumns}
            pageSize={mockData.albums.length}
            showPagination={false}
            className="-striped"
          />
        </TableStyle>
      </Drawer>
    </Wrapper>
  </PageWrapper>

DemoDrawers.propTypes = {
  imgSrc: PropTypes.string
}

export default withTheme(DemoDrawers)
