import { Button } from '@nextui-org/react'
import * as React from 'react'

export interface IWeightUnitSelectorProps {
    onChange: (unit: string) => void
}

export function WeightUnitSelector(props: IWeightUnitSelectorProps) {
    const [unit, setUnit] = React.useState('kg')
    const selectedClass = 'bg-slate-500'

    const updateUnit = (unit: string) => {
        return () => {
            setUnit(unit)
            props.onChange(unit)
        }
    }

    return (
        <div className='flex flex-row flex-grow items-center justify-end'>
            <p className='mr-2'> Unité </p>
            <Button
                size='sm'
                className={`rounded-r-none ${unit === 'Kg' ? selectedClass : ''}`}
                onClick={updateUnit('Kg')}>
                Kg
            </Button>
            <Button
                size='sm'
                className={`rounded-l-none ${unit === 'Lbs' ? selectedClass : ''}`}
                onClick={updateUnit('Lbs')}>
                Lbs
            </Button>
        </div>
    )
}
