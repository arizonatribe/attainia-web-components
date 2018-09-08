import icons from './icons'

export const colors = {
  primary: {
    default: '#E10600',
    lt: '#FF2A23',
    md: '#E10600',
    dk: '#FF0700'
  },
  secondary: {
    default: '#0072CE',
    lt: '#328ED7',
    md: '#0072CE',
    dk: '#005BA4'
  },
  grayscale: {
    white: '#ffffff',
    black: '#1E1E1E',
    lt: '#ebebeb',
    md: '#cacaca',
    dk: '#333333'
  },
  status: {
    error: '#E10600',
    warning: '#FFF59D',
    ok: '#64DD17'
  }
}

export const fonts = {
  fontSize: '12px',
  fontFamily: 'Lato, Helvetica, sans-serif'
}

export const forms = {
  smallFormWidth: '325px',
  formItemMargin: '5px 15px'
}

export const breakpoints = {
  phone: 'screen and (max-width: 599px)',
  tablet: 'screen and (min-width: 600px)',
  tabletLandscape: 'screen and (min-width: 900px)',
  desktop: 'screen and (min-width: 1200px)',
  largeDesktop: 'screen and (min-width: 1800px)'
}

export default {
  colors,
  breakpoints,
  icons,
  fonts,
  forms
}
