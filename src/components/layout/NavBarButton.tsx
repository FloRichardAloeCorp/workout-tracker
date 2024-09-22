import { Button } from '@nextui-org/react'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export interface INavBarButtonProps {
    icon: React.ReactNode
    name: string
    label: string
    current_button: string
    to: string
    onClick: (name: string) => void
}

export function NavBarButton(props: INavBarButtonProps) {
    const navigate = useNavigate()

    const btnSelectedClass = 'text-success'
    const btnInactiveClass = 'text-default'

    const handleClick = () => {
        props.onClick(props.name)
        navigate(props.to)
    }

    return (
        <div className={`flex flex-col items-center`}>
            <Button
                variant='light'
                size='sm'
                className={
                    props.name === props.current_button ? btnSelectedClass : btnInactiveClass
                }
                isIconOnly
                onPress={handleClick}>
                {props.icon}
            </Button>
            <p
                className={`description text-xs mt-[3px] ${
                    props.name === props.current_button ? btnSelectedClass : btnInactiveClass
                }`}>
                {props.label}
            </p>
        </div>
    )
}
