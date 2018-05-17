import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {isStringieThingie} from 'attasist'
import styled, {withTheme} from 'styled-components'
import {allPass, always, both, cond, prop, propEq, pathOr, T, test as regTest} from 'ramda'
import Chevron from './Chevron'
import SimpleSvgIcon from '../common/SimpleSvgIcon'

const DrawerStyle = styled.section`
    display: grid;
    grid-template-areas: "drawer-header" "drawer-content";
    background-color: ${pathOr('transparent', ['backgroundColor'])};
    ${props => !props.isExpanded && 'max-height: 4em;'}
    & > *:not(:first-child) {
        ${props => (!props.isExpanded && 'transform: scale(1,0);')}
        transition: transform 0.05s ease;
    }
`
const ContentWrapper = styled.section`
    display: grid;
    grid-area: drawer-content;
    padding: ${pathOr('0', ['padding'])};
    background-color: ${pathOr('transparent', ['backgroundColor'])};
    ${props => !props.isExpanded && 'display: none;'}
    & > * {
        border-left: ${pathOr('1px solid transparent', ['border'])};
        border-right: ${pathOr('1px solid transparent', ['border'])};
        border-bottom: ${pathOr('1px solid transparent', ['border'])};
    }
`
const Label = styled.span`
    display: block;
    grid-area: dh-title;
`
/* eslint-disable indent */
const DrawerHeader = styled.header`
    display: grid;
    box-sizing: border-box;
    grid-area: drawer-header;
    grid-column-gap: ${pathOr('8px', ['columnGap'])};
    grid-template-columns: ${cond([
        [allPass([
            prop('showCaret'),
            propEq('iconPosition', 'right'),
            prop('hasIcon')
        ]), always('auto auto 1fr auto')],
        [both(propEq('iconPosition', 'right'), prop('hasIcon')), always('auto auto 1fr')],
        [both(prop('showCaret'), prop('hasIcon')), always('auto 1fr auto')],
        [both(prop('showCaret'), propEq('iconPosition', 'right')), always('auto 1fr auto')],
        [prop('showCaret'), always('auto 1fr')],
        [prop('hasIcon'), always('auto 1fr')],
        [T, always('auto')]
    ])};
    grid-template-areas: ${cond([
        [allPass([
            prop('showCaret'),
            propEq('iconPosition', 'right'),
            prop('hasIcon')
        ]), always('"dh-title dh-icon . chevron"')],
        [both(propEq('iconPosition', 'right'), prop('hasIcon')), always('"dh-title dh-icon ."')],
        [both(prop('showCaret'), prop('hasIcon')), always('"dh-icon dh-title chevron"')],
        [both(prop('showCaret'), propEq('iconPosition', 'right')), always('"dh-title . chevron"')],
        [prop('showCaret'), always('"chevron dh-title"')],
        [prop('hasIcon'), always('"dh-icon dh-title"')],
        [T, always('"dh-title"')]
    ])};
    ${props => props.isCollapsible && 'cursor: pointer;'}
    align-items: center;
    padding: ${pathOr('.7em 1em', ['padding'])};
    font-size: ${pathOr('1.4em', ['fontSize'])};
    font-weight: ${pathOr('bold', ['fontWeight'])};
    color: ${props => (
        prop('color')(props) ||
        pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(props)
    )};
    background-color: ${props => (
        prop('backgroundColor')(props) ||
        pathOr('silver', ['theme', 'colors', 'misc', 'gray', 'ashGray'])(props)
    )};
`
const IconWrapper = styled.div`
    grid-area: dh-icon;
    & g {
        fill: ${props => prop('color')(props) || pathOr('white', ['theme', 'colors', 'grayscale', 'white'])(props)};
    }
`
/* eslint-enable indent */

class Drawer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: !!props.isExpanded
        }
    }
    toggleDrawer = () => this.setState({isExpanded: !this.state.isExpanded})
    render() {
        const {
            className,
            icon,
            iconClick,
            iconPosition,
            isCollapsible,
            showCaret,
            title,
            children,
            contentStyles,
            styles,
            ...restOfProps
        } = this.props
        const isExpanded = !isCollapsible || this.state.isExpanded
        return (
            <DrawerStyle
              {...restOfProps}
              className={className}
              backgroundColor={contentStyles.backgroundColor}
              isExpanded={isExpanded}
            >
                <DrawerHeader
                  onClick={this.toggleDrawer}
                  isCollapsible={isCollapsible}
                  showCaret={isCollapsible && showCaret}
                  hasIcon={!!icon}
                  iconPosition={regTest(/right/i, iconPosition) ? 'right' : 'left'}
                  {...styles}
                >
                    {icon &&
                        <IconWrapper onClick={iconClick}>
                            {isStringieThingie(icon) ?
                                <SimpleSvgIcon
                                  icon={icon}
                                  width={20}
                                  height={20}
                                /> : icon
                            }
                        </IconWrapper>
                    }
                    {isCollapsible && showCaret && <Chevron isOpen={isExpanded} />}
                    {title && <Label>{title}</Label>}
                </DrawerHeader>
                <ContentWrapper isExpanded={isExpanded} {...contentStyles}>{children}</ContentWrapper>
            </DrawerStyle>
        )
    }
}

Drawer.propTypes = {
    className: PropTypes.string,
    isCollapsible: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    iconClick: PropTypes.func,
    showCaret: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    styles: PropTypes.shape({
        columnGap: PropTypes.string,
        fontSize: PropTypes.string,
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        padding: PropTypes.string
    }),
    contentStyles: PropTypes.shape({
        backgroundColor: PropTypes.string,
        padding: PropTypes.string,
        border: PropTypes.string
    })
}

Drawer.defaultProps = {
    className: 'drawer',
    isCollapsible: true,
    isExpanded: true,
    iconPosition: 'left',
    iconClick: T,
    showCaret: true,
    contentStyles: {},
    styles: {}
}

export default withTheme(Drawer)
