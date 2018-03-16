import React from 'react'
import PropTypes from 'prop-types'

import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Page from './Page'
import NavBarList from './NavBarList'

const Layout = ({children, navItems}) =>
    <Page>
        <Header className="header" />
        <NavBarList items={navItems} className="sidebar" />
        <Main className="main">{children}</Main>
        <Footer className="footer" />
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
        <Layout navItems={navItems}>
            <WrappedComponent {...passThroughProps} />
        </Layout>

    WithLayout.propTypes = {
        navItems: PropTypes.arrayOf(NavItems)
    }

    return WithLayout
}

export const withTheseNavItems = items => (WrappedComponent) => {
    const WithLayout = props =>
        <Layout navItems={items}>
            <WrappedComponent {...props} />
        </Layout>

    WithLayout.propTypes = {
        navItems: PropTypes.arrayOf(NavItems)
    }

    return WithLayout
}

export default Layout
