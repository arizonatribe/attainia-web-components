import {render} from 'react-dom'
import Routes from './Routes'
import './globals'

function renderApp(Component) {
    render(Component, document.querySelector('#app-root'))
}

renderApp(Routes)

if (module && module.hot) {
    module.hot.accept('./Routes', () => {
        /* eslint "global-require": "off" */
        const DevRoutes = require('./Routes').default
        renderApp(DevRoutes)
    })
}
