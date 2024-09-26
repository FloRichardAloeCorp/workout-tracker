import { Badge, Card, CardBody } from '@nextui-org/react'

export interface IComparisonCardProps {
    baseValue: number
    newValue: number
}

export function ComparisonCard(props: IComparisonCardProps) {
    const diff = Math.round(props.newValue - props.baseValue)

    const color = diff < 0 ? 'danger' : diff > 0 ? 'success' : 'default'

    return (
        <div>
            <Badge content={diff < 0 ? `${diff}` : `+${diff}`} color={color}>
                <Card shadow='sm' radius='sm' className='w-16 overflow-hidden'>
                    <CardBody className='flex-row justify-center items-baseline'>
                        <p className={`text-${color} mr-1`}>{props.newValue}</p>
                    </CardBody>
                </Card>
            </Badge>
        </div>
    )
}
