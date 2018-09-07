import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'
import {boolean, select} from '@storybook/addon-knobs'
import {iconAddSolid, iconSearch} from 'carbon-icons'
import Button from './Button'

const icons = {
    none: 'None',
    iconAddSolid: 'Add with filled circle (iconAddSolid from `carbon-icons`)',
    iconSearch: 'Search (iconSearch from `carbon-icons`)'
}

const iconMap = {
    iconAddSolid,
    iconSearch
}

const kinds = {
    primary: 'Primary button (primary)',
    secondary: 'Secondary button (secondary)',
    danger: 'Danger button (danger)',
    'danger--primary': 'Danger primary button (danger--primary)',
    ghost: 'Ghost button (ghost)'
}

const props = {
    regular: () => ({
        className: 'some-class',
        kind: select('Button kind (kind)', kinds, 'primary'),
        disabled: boolean('Disabled (disabled)', false),
        small: boolean('Small (small)', false),
        icon: iconMap[select('Icon (icon)', icons, 'none')],
        onClick: action('onClick'),
        onFocus: action('onFocus')
    }),
    set: () => ({
        className: 'some-class',
        disabled: boolean('Disabled (disabled)', false),
        small: boolean('Small (small)', false),
        icon: iconMap[select('Icon (icon)', icons, 'none')],
        onClick: action('onClick'),
        onFocus: action('onFocus')
    })
}

storiesOf('Buttons', module).add(
    'Default',
    withInfo({
        text: `
        Buttons are used to initialize an action, either in the background or
        foreground of an experience.
        There are several kinds of buttons.
        Primary buttons should be used for the principle call to action
        on the page.
        Secondary buttons should be used for secondary actions on each page.
        Danger buttons should be used for a negative action (such as Delete) on the page.
        Modify the behavior of the button by changing its event properties.
        Small buttons may be used when there is not enough space for a
        regular sized button. This issue is most found in tables. Small button should have three words
        or less.
        When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are
        always paired with text.
      `
    })(() => {
        const regularProps = props.regular()
        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Button {...regularProps} className="some-class">
                    Button
                </Button>
                &nbsp;
                <Button {...regularProps} kind="secondary" href="#" className="some-class">
                    Link
                </Button>
                &nbsp;
            </div>
        )
    })
)
