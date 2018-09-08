import React, {createContext, PureComponent} from 'react'
import PropTypes from 'prop-types'
import {filter, pathOr} from 'ramda'
import styled, {withTheme} from 'styled-components'
import {ReactTableStyle, List} from '../components/react-table'
import {fuzzyCurry} from '../components/react-table/helpers'
import mockData from './albums.json'

import {Drawer, HeaderImage, ContentWrapper} from '../components/layout'

const DemoListContext = createContext('demoList')

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
  width: 250
}]

class DemoList extends PureComponent {
    state = {
      albums: [...mockData.albums]
    }
    filterList = ({search = ''}) => this.setState({
      albums: search ?
        filter(({title}) => fuzzyCurry(search, title))(this.state.albums) :
        [...mockData.albums]
    })
    render() {
      const {imgSrc} = this.props
      return (
        <DemoListContext.Provider value={this.state.albums}>
          <PageWrapper>
            <HeaderImage backgroundImage={imgSrc} height="110px" />
            <Wrapper>
              <Drawer
                title="90s Albums"
                styles={{
                  columnGap: '1em',
                  backgroundColor: pathOr('crimson', ['theme', 'colors', 'primary', 'default'])(this.props)
                }}
                contentStyles={{
                  backgroundColor: 'snow',
                  border: '1px solid lightgray'
                }}
              >
                <TableStyle>
                  <DemoListContext.Consumer>
                    {albums =>
                      <List
                        noTitle
                        findList={this.filterList}
                        entityName="album"
                        hasAddButton={false}
                        matchProp="title"
                        rows={mockData.albums}
                        searchResults={albums}
                        columns={defaultColumns}
                        pageSize={albums.length}
                        showPagination={false}
                        className="-striped"
                      />
                    }
                  </DemoListContext.Consumer>
                </TableStyle>
              </Drawer>
            </Wrapper>
          </PageWrapper>
        </DemoListContext.Provider>
      )
    }
}

DemoList.propTypes = {
  imgSrc: PropTypes.string
}

export default withTheme(DemoList)
