import { Button } from '@nextui-org/react'
import * as React from 'react'

export interface IWeightUnitSelectorProps {
    onChange: (unit: string) => void
}

export function WeightUnitSelector(props: IWeightUnitSelectorProps) {
    const [unit, setUnit] = React.useState('Kg')

    const updateUnit = (unit: string) => {
        return () => {
            setUnit(unit)
            props.onChange(unit)
        }
    }

    return (
        <div className='flex flex-row flex-grow items-center justify-end '>
            <Button
                size='sm'
                className={`rounded-r-none min-w-0 w-11 text-[#09231B] ${
                    unit === 'Kg' ? 'bg-[#FFDB95]' : 'bg-[#FEEFC2]'
                }`}
                onClick={updateUnit('Kg')}>
                Kg
            </Button>
            <Button
                size='sm'
                className={`rounded-l-none min-w-0 w-11 text-[#09231B] ${
                    unit === 'Lbs' ? 'bg-[#FFDB95]' : 'bg-[#FEEFC2]'
                }`}
                onClick={updateUnit('Lbs')}>
                Lbs
            </Button>
        </div>
    )
}
