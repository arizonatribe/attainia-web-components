import React from 'react'
import uuid from 'uuid/v4'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import Link from 'react-router-dom/Link'
import styled, {withTheme} from 'styled-components'
import {compose, complement, isNil, pickBy, replace, toUpper, toLower} from 'ramda'
import {getThemeProp, LinkButton, SimpleSvgIcon} from '../common'

const isNotNil = complement(isNil)
const capitalize = str => str.replace(/(?:^|\s)\S/g, toUpper)
const hyphenate = compose(replace(/--/g, '-'), replace(/\s/g, '-'))
const formatButtonText = compose(str => `Add a ${str}`, capitalize, toLower)
const formatResourceName = compose(pluralize, capitalize, toLower, hyphenate)
const formatRoutePath = compose(pluralize, toLower, hyphenate)

const Li = styled.div`
    text-align: left;
    @supports not (display: grid) {
        display: block;
    }

    @supports (display: grid) {
        display: grid;
        align-content: center;
    }
`
const ListHeader = styled.ul`
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
    list-style: none;
    margin: 0;
    padding: 12px;
    background: ${getThemeProp(['colors', 'grayscale', 'lt'], 'lightgray')};

    @supports not (display: grid) {
        & > * {
            margin: 0 auto;
            max-width: 50em;
        }
    }

    @supports (display: grid) {
        display: grid;
        grid-template-columns: 1fr${
    props => props.numOfIconButtons > 0 && ` repeat(${props.numOfIconButtons}, 50px)`}${
    props => props.hasAddButton && ' minmax(auto,140px)'};
        grid-template-rows: 50px;
        grid-template-areas: "title${props => Array(Number(props.numOfIconButtons)).fill(' icon')}${
    props => props.hasAddButton && ' button'}";
        ${props => (Boolean(props.numOfIconButtons) || props.hasAddButton) && 'grid-column-gap: 3px;'}

        .titleAndSubtitle {
            display: inline-grid;
            grid-template-columns: minmax(auto,max-content) ${props => props.hasSubtitle && '1fr'};
            align-items: center;
            ${props => Boolean(props.alignTitle) && `justify-content: ${props.alignTitle};`}
            .title {
                padding-right: 10px; 
            }
            .subtitle {
                color: ${getThemeProp(['colors', 'grayscale', 'md'], 'mediumgray')}
            }
        }
    }
`

ListHeader.propTypes = {
    alignTitle: PropTypes.oneOf(['center', 'start', 'end']),
    hasAddButton: PropTypes.bool,
    hasSubtitle: PropTypes.bool,
    numOfIconButtons: PropTypes.number
}

const ContentHeader = ({
    alignTitle, className, resourceTitle, resourceSubtitle, iconsButtons, hasAddButton, ...additionalProps
}) =>
    <ListHeader
      {...pickBy(isNotNil, {
          className,
          alignTitle,
          hasAddButton,
          hasSubtitle: isNotNil(resourceSubtitle)
      })}
      numOfIconButtons={iconsButtons.length}
    >
        <Li className="titleAndSubtitle">
            <h1 className="title">{formatResourceName(resourceTitle)}</h1>
            {isNotNil(resourceSubtitle) ? <h2 className="subtitle">{`( ${resourceSubtitle} )`}</h2> : null}
        </Li>
        {iconsButtons.map(iconButton =>
            <Li key={uuid()}>
                <SimpleSvgIcon
                  {...iconButton}
                  fill={getThemeProp(['colors', 'secondary', 'default'])(additionalProps)}
                />
            </Li>
        )}
        {hasAddButton ?
            <Li>
                <LinkButton style={{padding: '12px 0'}}>
                    <Link to={`/${formatRoutePath(resourceTitle)}/new`}>{formatButtonText(resourceTitle)}</Link>
                </LinkButton>
            </Li>
            : null}
    </ListHeader>

ContentHeader.propTypes = {
    alignTitle: PropTypes.oneOf(['center', 'start', 'end']),
    className: PropTypes.string,
    hasAddButton: PropTypes.bool,
    iconsButtons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.string.isRequired,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onClick: PropTypes.func
    })).isRequired,
    resourceSubtitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    resourceTitle: PropTypes.string.isRequired
}

ContentHeader.defaultProps = {
    iconsButtons: [],
    resourceTitle: 'resource'
}

export default withTheme(ContentHeader)
