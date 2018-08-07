import {is} from 'ramda'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Page from './Page'
import NavBarList from './NavBarList'
import StickyMessages from './StickyMessages'

class Layout extends PureComponent {
    state = {
        isCollapsed: false
    }
    toggleNavList = () => this.setState({isCollapsed: !this.state.isCollapsed})
    render() {
        const {children, navItems, ...restOfProps} = this.props
        const propsToggle = is(Function, this.props.toggleMenu)
        return (
            <Page isCollapsed={propsToggle ? this.props.isCollapsed : this.state.isCollapsed}>
                <Header {...restOfProps} />
                <NavBarList
                  isCollapsed={propsToggle ? this.props.isCollapsed : this.state.isCollapsed}
                  toggleMenu={propsToggle ? this.props.toggleMenu : this.toggleNavList}
                  items={navItems}
                  {...restOfProps}
                />
                <Main {...restOfProps}>{children}</Main>
                <Footer />
                <StickyMessages {...restOfProps} />
            </Page>
        )
    }
}

const NavItems = PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
    iconName: PropTypes.string
})

Layout.propTypes = {
    isCollapsed: PropTypes.bool,
    toggleMenu: PropTypes.func,
    children: PropTypes.node,
    navItems: PropTypes.arrayOf(NavItems)
}

export const withLayout = (WrappedComponent) => {
    const WithLayout = ({navItems, ...passThroughProps}) =>
        <Layout navItems={navItems} {...passThroughProps}>
            <WrappedComponent {...passThroughProps} />
        </Layout>

    WithLayout.propTypes = {
        navItems: PropTypes.arrayOf(NavItems)
    }

    return WithLayout
}

export const withTheseNavItems = (items, layoutProps = {}) => (WrappedComponent) => {
    const WithLayout = props =>
        <Layout navItems={items} {...props} {...layoutProps}>
            <WrappedComponent {...props} />
        </Layout>

    WithLayout.propTypes = {
        navItems: PropTypes.arrayOf(NavItems)
    }

    return WithLayout
}

export default Layout
