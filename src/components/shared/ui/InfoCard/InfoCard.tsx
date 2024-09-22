import { Card, CardBody, CardHeader } from '@nextui-org/react'
import * as React from 'react'

export interface IInfoCardProps {
    icon: React.ReactNode
    content: string | React.ReactNode
    description?: string
    height?: string
    color: 'yellow' | 'purple'
}

export function InfoCard(props: IInfoCardProps) {
    const setColors = () => {
        switch (props.color) {
            case 'yellow':
                return `bg-[#FEEFC2] text-[#09231B]`
            case 'purple':
                return `bg-[#E8E5F1] text-[#211B2E]`
            default:
                return ''
        }
    }

    const setIconColor = () => {
        switch (props.color) {
            case 'yellow':
                return 'text-[#FFDB95]'
            case 'purple':
                return 'text-[#b3adc5]'
            default:
                break
        }
    }

    const renderContent = () => {
        if (typeof props.content === 'string') {
            return <p className='font-semibold'>{props.content}</p>
        } else {
            return props.content
        }
    }

    return (
        <Card
            className={`w-[47%] max-h-full ${setColors()} ${
                props.height != null ? 'h-' + props.height : ''
            }`}
            shadow='none'>
            <CardHeader className={`items-center justify-center ${setIconColor()}`}>
                {props.icon}
            </CardHeader>
            <CardBody className='justify-center items-center'>
                {renderContent()}
                <p className='description'>{props.description}</p>
            </CardBody>
        </Card>
    )
}
