import { Button, ButtonGroup } from '@nextui-org/react'
import * as React from 'react'

export interface IButtonsBarSelectorProps {
    color: 'yellow'
    baseTextColor: string
    items: ButtonsBarItems[]
    selectedKey?: string
    onSelect: (value: string) => void
}

export interface ButtonsBarItems {
    label: string
    value: string
    key: string
}

export function ButtonsBarSelector(props: IButtonsBarSelectorProps) {
    const [activeButton, setActiveButton] = React.useState(props.selectedKey)

    const setBackgroundColor = () => {
        switch (props.color) {
            case 'yellow':
                return 'bg-yellow-100'

            default:
                return ''
        }
    }

    const setBorderColor = () => {
        switch (props.color) {
            case 'yellow':
                return 'border-yellow-100'

            default:
                return ''
        }
    }

    return (
        <ButtonGroup className={`max-w-full rounded-lg ${setBackgroundColor()}`} size='sm'>
            {props.items.map((item) => (
                <Button
                    key={item.key}
                    variant='light'
                    disableRipple
                    className={`border-2 ${
                        activeButton === item.key
                            ? `!rounded-lg ${setBorderColor()} bg-white`
                            : `border-transparent ${setBackgroundColor()}`
                    }`}
                    onClick={() => {
                        setActiveButton(item.key)
                        props.onSelect(item.value)
                    }}>
                    {item.label}
                </Button>
            ))}
        </ButtonGroup>
    )
}
