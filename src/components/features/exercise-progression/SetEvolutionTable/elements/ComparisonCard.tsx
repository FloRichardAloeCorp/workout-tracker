import { Badge, Card, CardBody } from '@nextui-org/react'

export interface IComparisonCardProps {
    baseValue: number
    newValue: number
    unit: string
}

export function ComparisonCard(props: IComparisonCardProps) {
    const diff = props.newValue - props.baseValue

    const textColor = diff < 0 ? 'text-danger' : 'text-success'

    return (
        <div>
            <Badge
                content={diff < 0 ? `${diff}` : `+${diff}`}
                color={diff < 0 ? 'danger' : 'success'}>
                <Card shadow='sm' radius='sm' className='w-16'>
                    <CardBody className='flex-row justify-center items-baseline'>
                        <p className={textColor + ' mr-1'}>{props.newValue}</p>
                        <p className={'text-xs ' + textColor}>{props.unit}</p>
                    </CardBody>
                </Card>
            </Badge>
        </div>
    )
}
