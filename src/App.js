import React from 'react'

import {ContentCentered, ContentHeader, ContentWrapper, ModalButton} from './components/layout'

const App = () =>
    <div>
        <ContentWrapper>
            <ContentHeader hasAddButton />
            <ContentCentered>
                <h1>Welcome to our site!</h1>
            </ContentCentered>
            <ContentCentered>
                <ModalButton />
            </ContentCentered>
        </ContentWrapper>
    </div>

export default App
