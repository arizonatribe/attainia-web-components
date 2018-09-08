import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pathOr, path} from 'ramda'

const HeaderImage = styled.div`
    position: relative;
    background: transparent;
    width: 100%;
    min-height: ${pathOr('110px', ['styles', 'height'])};
    ${props => path(['styles', 'boxShadow'], props) && `box-shadow: ${props.styles.boxShadow};`} 

    &::after {
        content: "";
        ${props => props.backgroundImage && `background: url(${props.backgroundImage}) no-repeat;`}
        background-size: 100%;
        max-height: ${pathOr('110px', ['styles', 'height'])};
        opacity: ${pathOr(0.3, ['styles', 'opacity'])};
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: ${pathOr(-1, ['styles', 'zIndex'])};   
    }

    @supports not (display: grid) {
        display: flex;
    }

    @supports (display: grid) {
        display: grid;
    }

    justify-content: center;
    align-items: center;
`

HeaderImage.propTypes = {
  backgroundImage: PropTypes.string,
  styles: PropTypes.shape({
    boxShadow: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    opacity: PropTypes.number,
    zIndex: PropTypes.number
  })
}

HeaderImage.defaultProps = {
  styles: {
    height: '110px',
    opacity: 0.3,
    zIndex: -1
  }
}

export default HeaderImage
