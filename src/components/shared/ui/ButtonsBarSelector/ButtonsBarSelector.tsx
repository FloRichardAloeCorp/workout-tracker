import { Button, ButtonGroup } from '@nextui-org/react'
import * as React from 'react'

export interface IButtonsBarSelectorProps {
    baseBackgroundColor: string
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

    const isSelected = (btnName: string) => {
        if (activeButton === btnName)
            return {
                backgroundColor: 'white',
                borderColor: props.baseBackgroundColor,
                borderRadius: '0.5rem',
            }
        return { borderColor: 'transparent' }
    }

    return (
        <ButtonGroup
            className={`max-w-full rounded-lg bg-[${props.baseBackgroundColor}]`}
            size='sm'>
            {props.items.map((item) => (
                <Button
                    key={item.key}
                    variant='light'
                    disableRipple
                    style={{
                        color: props.baseTextColor,
                        borderWidth: '2px',
                        ...isSelected(item.key),
                    }}
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
