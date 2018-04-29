import uuid from 'uuid/v4'
import React from 'react'
import styled, {withTheme} from 'styled-components'
import PropTypes from 'prop-types'
import NavLink from 'react-router-dom/NavLink'
import {SimpleSvgIcon} from '../common'
import {getThemeProp} from '../common/helpers'

const Li = styled.li` 
    display: block;
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
    }
    & a {
        @media ${getThemeProp(['breakpoints', 'tablet'], 'screen and (min-width: 600px)')} {
            ${props => props.isCollapsed && '& span {display: none;}'}
        }
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
        align-items: center;
    }

    & a.active {
        background: ${getThemeProp(['colors', 'primary', 'default'], 'crimson')};
    }
`
const Ul = styled.ul`
    margin: 0;
    padding: 0;
    display: grid;
    grid-row-gap: 0;
    grid-area: sidebar;
    align-content: start;
    box-sizing: border-box;
    background-color: ${getThemeProp(['colors', 'grayscale', 'black'], 'black')};
    top: 0;
    @media ${getThemeProp(['breakpoints', 'tablet'], 'screen and (min-width: 600px)')} {
        position: sticky;
        height: calc(100vh - 0px);
    }
`
const ToggleArrow = styled.li`
    @media ${getThemeProp(['breakpoints', 'phone'], 'screen and (max-width: 599px)')} {
        display: none;
    }
    @media ${getThemeProp(['breakpoints', 'tablet'], 'screen and (min-width: 600px)')} {
        cursor: pointer;
        position: fixed;
        bottom: 15px;
        left: 15px;
        display: inline-block;
        list-style: none;
        font-size: 12px;
        color: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};
        &:before {
            content: '';
            display: inline-block;
            width: 0.6em;
            height: 0.6em;
            margin-right: 5px;
            border-style: solid;
            border-width: 0.18em 0.18em 0 0;
            transform: rotate(${props => (props.isCollapsed ? 45 : 225)}deg);
            transition: transform .05s ease;
        }
    }
`

const NavBarList = ({className, items, toggleMenu, isCollapsed, ...restOfProps}) =>
    <Ul className={className} isCollapsed={isCollapsed}>
        {items.map(({iconName, link, label, width = 20, height = 20}) =>
            <Li key={uuid()} role="presentation" isCollapsed={isCollapsed}>
                <NavLink to={link}>
                    {iconName &&
                        <SimpleSvgIcon
                          icon={iconName}
                          width={width}
                          height={height}
                          fill={getThemeProp(['colors', 'grayscale', 'white'], 'white')(restOfProps)}
                        />
                    }
                    <span>{label}</span>
                </NavLink>
            </Li>
        )}
        <ToggleArrow onClick={toggleMenu} isCollapsed={isCollapsed}>{isCollapsed ? '' : 'Hide'}</ToggleArrow>
    </Ul>

NavBarList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        iconName: PropTypes.string,
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    toggleMenu: PropTypes.func,
    isCollapsed: PropTypes.bool,
    className: PropTypes.string.isRequired
}

NavBarList.defaultProps = {
    className: 'sidebar',
    isCollapsed: false,
    items: []
}

export default withTheme(NavBarList)
