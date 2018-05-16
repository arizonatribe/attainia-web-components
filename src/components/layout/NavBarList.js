import uuid from 'uuid/v4'
import React from 'react'
import styled, {withTheme} from 'styled-components'
import PropTypes from 'prop-types'
import NavLink from 'react-router-dom/NavLink'
import {pathOr} from 'ramda'
import Drawer from './Drawer'
import {SimpleSvgIcon} from '../common'

const NavAction = styled.div`
    &:hover {
        background: ${pathOr('crimson', ['theme', 'colors', 'primary', 'default'])};
    }
`
const Ul = styled.ul`
    margin: 0;
    display: grid;
    align-content: start;
    box-sizing: border-box;
`
const Li = styled.li`
    display: grid;
    align-items: center;
    transition: background 0.1s ease;
    color: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
    list-style: none;
    font-size: 16px;
    cursor: pointer;
    border-color: transparent;
    border-left-style: solid;
    border-left-width: 5px;

    & a, .nav-action {
        padding: 10px 0;
        color: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
        & span {
            display: block;
            user-select: none;
        }
        @media ${pathOr('screen and (min-width: 600px)', ['theme', 'breakpoints', 'tablet'])} {
            ${props => props.isCollapsed && '& span {display: none;}'}
        }
        display: grid;
        grid-column-gap: 8px;
        text-decoration: none;
        grid-template-columns: auto 1fr;
        align-items: center;
    }

    & a.active {
        background: ${pathOr('crimson', ['theme', 'colors', 'primary', 'default'])};
    }
`
const SubUl = styled(Ul)`
    padding-left: 20px;
`
const NavUl = styled(Ul)`
    grid-area: sidebar;
    padding-left: 15px;
    background-color: ${pathOr('black', ['theme', 'colors', 'grayscale', 'black'])};
    @media ${pathOr('screen and (min-width: 600px)', ['theme', 'breakpoints', 'tablet'])} {
        position: sticky;
        height: calc(100vh - 0px);
    }
`
const ToggleArrow = styled.li`
    @media ${pathOr('screen and (max-width: 599px)', ['theme', 'breakpoints', 'phone'])} {
        display: none;
    }
    @media ${pathOr('screen and (min-width: 600px)', ['theme', 'breakpoints', 'tablet'])} {
        cursor: pointer;
        position: fixed;
        bottom: 15px;
        left: 15px;
        display: inline-block;
        list-style: none;
        font-size: 12px;
        color: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
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

const navItems = {
    iconName: PropTypes.string,
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const Link = ({link, iconName, onClick, width, height, label, ...restOfProps}) => (
    onClick ?
        <NavAction className="nav-action" onClick={onClick}>
            <SimpleSvgIcon
              width={width || 15}
              height={height || 15}
              icon={iconName || 'plus'}
              fill={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(restOfProps)}
            />
            <span>{label}</span>
        </NavAction> :
        <NavLink to={link}>
            <SimpleSvgIcon
              width={width || 15}
              height={height || 15}
              icon={iconName || 'plus'}
              fill={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(restOfProps)}
            />
            <span>{label}</span>
        </NavLink>
)

Link.propTypes = {...navItems}

const NavBarList = ({className, items, toggleMenu, isCollapsed, ...restOfProps}) =>
    <NavUl className={className} isCollapsed={isCollapsed}>
        {items.map(({iconName, link, label, width = 20, height = 20, items: subItems}) =>
            <Li key={uuid()} role="presentation" isCollapsed={isCollapsed}>
                {Array.isArray(subItems) && !isCollapsed ?
                    <Drawer
                      title={label}
                      iconName={iconName}
                      styles={{
                          fontSize: '16px',
                          padding: '10px 0',
                          fontWeight: 'normal',
                          backgroundColor: 'transparent'
                      }}
                    >
                        <SubUl>{subItems.map(sm => <Li key={uuid()} role="presentation"><Link {...sm} /></Li>)}</SubUl>
                    </Drawer> : <Link {...{...restOfProps, iconName, width, height, label, link}} />
                }
            </Li>
        )}
        <ToggleArrow onClick={toggleMenu} isCollapsed={isCollapsed}>{isCollapsed ? '' : 'Hide'}</ToggleArrow>
    </NavUl>

NavBarList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        ...navItems,
        items: PropTypes.arrayOf(PropTypes.shape(navItems))
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
