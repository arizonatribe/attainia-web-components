import uuid from 'uuid/v4'
import React from 'react'
import PropTypes from 'prop-types'
import {isStringieThingie} from 'attasist'
import NavLink from 'react-router-dom/NavLink'
import styled, {withTheme} from 'styled-components'
import {always, cond, pathOr, propIs, propSatisfies, T} from 'ramda'
import Drawer from './Drawer'
import {SimpleSvgIcon} from '../common'

const NavAction = styled.div`
    &:hover {
        background: ${pathOr('crimson', ['theme', 'colors', 'primary', 'default'])};
    }
`
const Ul = styled.ul`
    margin: 0;
    padding: 0;
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
    font-size: ${pathOr('15px', ['fontSize'])};
    cursor: pointer;

    & a, .nav-action, .nav-label {
        padding: 10px 0;
        color: ${pathOr('white', ['theme', 'colors', 'grayscale', 'white'])};
        & svg {
            grid-area: nav-icon;
        }
        & span {
            grid-area: nav-text;
            display: block;
            user-select: none;
        }
        @media ${pathOr('screen and (min-width: 600px)', ['theme', 'breakpoints', 'tablet'])} {
            ${props => props.isCollapsed && '& span {display: none;}'}
        }
        display: grid;
        grid-column-gap: 8px;
        text-decoration: none;
        grid-template-columns: 5px auto${props => !props.isCollapsed && ' 1fr'};
        grid-template-areas: ". nav-icon${props => !props.isCollapsed && ' nav-text'}";
        align-items: center;
    }

    & .nav-label {
        grid-template-columns: 7px auto 1fr;
    }

    & a.active {
        background: ${pathOr('crimson', ['theme', 'colors', 'primary', 'default'])};
    }
`
const SubLi = styled(Li)`
    & a {
        grid-template-columns: 20px auto 1fr;
    }
`
const NavUl = styled(Ul)`
    grid-area: sidebar;
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
        left: 10px;
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
    label: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const Action = ({onClick, width, height, iconName, label, ...restOfProps}) =>
    <NavAction className="nav-action" onClick={onClick}>
        <SimpleSvgIcon
          width={width || 10}
          height={height || 10}
          icon={iconName || 'plus'}
          fill={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(restOfProps)}
        />
        {label && <span>{label}</span>}
    </NavAction>

Action.propTypes = {...navItems}

const Link = ({link, width, height, iconName, label, ...restOfProps}) =>
    <NavLink to={link}>
        <SimpleSvgIcon
          width={width || 10}
          height={height || 10}
          icon={iconName || 'plus'}
          fill={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(restOfProps)}
        />
        {label && <span>{label}</span>}
    </NavLink>

Link.propTypes = {...navItems}

const LabelAndIcon = ({width, height, iconName, label, ...restOfProps}) =>
    <NavAction className="nav-label">
        <SimpleSvgIcon
          width={width || 10}
          height={height || 10}
          icon={iconName || 'plus'}
          fill={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(restOfProps)}
        />
        {label && <span>{label}</span>}
    </NavAction>

LabelAndIcon.propTypes = {...navItems}

const IconOnly = ({width, height, iconName, label, ...restOfProps}) =>
    <NavAction className="nav-label">
        <SimpleSvgIcon
          width={width || 10}
          height={height || 10}
          icon={iconName || 'plus'}
          fill={pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(restOfProps)}
        />
    </NavAction>

IconOnly.propTypes = {...navItems}

const NavMap = cond([
    [propIs(Function, 'onClick'), Action],
    [propSatisfies(isStringieThingie, 'link'), Link],
    [propSatisfies(isStringieThingie, 'label'), LabelAndIcon],
    [propSatisfies(isStringieThingie, 'iconName'), IconOnly],
    [T, always(null)]
])

NavMap.propTypes = {...navItems}

const NavBarList = ({className, items, toggleMenu, isCollapsed, ...restOfProps}) =>
    <NavUl className={className} isCollapsed={isCollapsed}>
        {items.map(({iconName, link, label, width = 20, height = 20, items: subItems}) =>
            <Li key={uuid()} role="presentation" isCollapsed={isCollapsed}>
                {Array.isArray(subItems) && !isCollapsed ?
                    <Drawer
                      title={label}
                      iconName={iconName}
                      styles={{
                          fontSize: '15px',
                          fontWeight: 'normal',
                          padding: '10px 0 10px 15px',
                          backgroundColor: 'transparent'
                      }}
                    >
                        <Ul>
                            {subItems.map(sm =>
                                <SubLi key={uuid()} role="presentation" fontSize="14px"><NavMap {...sm} /></SubLi>
                            )}
                        </Ul>
                    </Drawer> :
                    <NavMap {...{...restOfProps, link, width, height, iconName, label: isCollapsed ? '' : label}} />
                }
            </Li>
        )}
        <ToggleArrow onClick={toggleMenu} isCollapsed={isCollapsed}>
            {isCollapsed ? '' : 'Hide'}
        </ToggleArrow>
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
