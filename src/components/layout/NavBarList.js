import uuid from 'uuid/v4'
import React from 'react'
import styled, {withTheme} from 'styled-components'
import PropTypes from 'prop-types'
import NavLink from 'react-router-dom/NavLink'
import {SimpleSvgIcon} from '../common'
import {getThemeProp} from '../common/helpers'

const Li = styled.li` 
    transition: background 0.1s ease;
    cursor: pointer;
    color: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};
    list-style: none;
    font-size: 16px;
    line-height: 19px;
    border-left-width: 5px;
    border-color: transparent;
    border-left-style: solid;

    &:hover {
        border-color: ${getThemeProp(['colors', 'primary', 'default'], 'crimson')};
        background: ${getThemeProp(['colors', 'grayscale', 'dk'], 'darkgray')};
    }
    & a {
        padding: 10px 15px;
        color: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};
        text-decoration: none;
        @supports not (display: grid) {
            display: block;
        }
        @supports (display: grid) {
            display: grid;
            grid-column-gap: 8px;
            grid-template-areas: "icon text";
        }
        justify-content: start;
    }

    & a.active {
        background: ${getThemeProp(['colors', 'primary', 'default'], 'crimson')};
    }
`
const Ul = styled.ul`
    background-color: ${getThemeProp(['colors', 'grayscale', 'dk'], 'darkgray')};
    padding: 0;
    margin: 0;
    width: 200px;
    box-sizing: border-box;
`

const NavBarList = ({items, theme}) =>
    <Ul>
        {items.map(({iconName, link, label, width = 25, height = 25}) =>
            <Li key={uuid()} role="presentation">
                <NavLink to={link}>
                    {iconName &&
                        <SimpleSvgIcon
                          icon={iconName}
                          width={width}
                          height={height}
                          fill={getThemeProp(['colors', 'grayscale', 'white'], 'white')({theme})}
                        />
                    }
                    <span>{label}</span>
                </NavLink>
            </Li>
        )}
    </Ul>

NavBarList.propTypes = {
    theme: PropTypes.shape({
        colors: PropTypes.shape({
            grayscale: PropTypes.shape({
                white: PropTypes.string
            })
        })
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
        iconName: PropTypes.string,
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }))
}

NavBarList.defaultProps = {
    items: []
}

export default withTheme(NavBarList)
