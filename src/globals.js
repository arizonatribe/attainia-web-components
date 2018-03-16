/* eslint "no-unused-expressions": "off" */
import 'regenerator-runtime/runtime'
import {injectGlobal} from 'styled-components'
import initReactFastclick from 'react-fastclick'

initReactFastclick()
injectGlobal`
    html, body, #app-root {
        margin: 0;
        padding: 0;
        height: 100%;
        box-sizing: border-box;
    }

    body, button, input, select, textarea {
        font-family: ArialMT, Arial;
        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        color: #4D4D4D;
    } 

    button:focus, input:focus, select:focus, textarea:focus {
        outline: none;
    }

    p {
        margin: 0;
    }

    h1, h2, h3 {
        margin: 0;
        padding: 10px 0;
    }

    img {
        display: block;
        border: 0;
    }

    @supports (display: grid) {
        #app-root, #modal-root {
            display: grid;
            align-items: center;
        }
    }

    #modal-root {
        position: relative;
        z-index: 999;
    }
`
