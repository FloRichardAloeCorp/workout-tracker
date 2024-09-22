import { Button, ButtonGroup } from '@nextui-org/react'
import * as React from 'react'

export interface IButtonsBarSelectorProps {
    baseBackgroundColor: string
    baseTextColor: string
    items: ButtonsBarItems[]
    onSelect: (value: string) => void
}

export interface ButtonsBarItems {
    label: string
    value: string
    key: string
}

export function ButtonsBarSelector(props: IButtonsBarSelectorProps) {
    const [activeButton, setActiveButton] = React.useState('')
    const isSelected = (btnName: string) => {
        if (activeButton === btnName) return 'bg-white !rounded-lg'
        return 'border-transparent'
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
                    className={`text-[${props.baseTextColor}] border-2  ${isSelected(item.key)}`}
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
