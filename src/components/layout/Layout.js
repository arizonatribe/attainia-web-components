import React from 'react'
import PropTypes from 'prop-types'

import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Page from './Page'
import NavBarList from './NavBarList'
import StickyMessages from './StickyMessages'

const Layout = ({children, navItems, ...restOfProps}) =>
    <Page>
        <Header {...restOfProps} />
        <NavBarList items={navItems} />
        <Main {...restOfProps}>{children}</Main>
        <Footer />
        <StickyMessages {...restOfProps} />
    </Page>

const NavItems = PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string,
    iconName: PropTypes.string
})

Layout.propTypes = {
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

export const withTheseNavItems = items => (WrappedComponent) => {
    const WithLayout = props =>
        <Layout navItems={items} {...props}>
            <WrappedComponent {...props} />
        </Layout>

    WithLayout.propTypes = {
        navItems: PropTypes.arrayOf(NavItems)
    }

    return WithLayout
}

export default Layout
