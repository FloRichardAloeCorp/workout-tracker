import { Button, Input, Spacer } from '@nextui-org/react'
import { Set } from '../../../../type'
import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { WeightUnitSelector } from './elements/WeightUnitSelector'

export interface IExerciseRecorderProps {
    trackingId: string
    onChange: (trackingId: string, sets: Set[]) => void
}

export function ExerciseRecorder(props: IExerciseRecorderProps) {
    const [unit, setUnit] = useState('Kg')
    const [setsData, setSetsData] = useState<Set[]>([])

    const addSet = () => {
        setSetsData((previous) => {
            const updatedSets = [
                ...previous,
                { set_id: crypto.randomUUID(), weight: 0, repetitions: 0 },
            ]
            props.onChange(props.trackingId, updatedSets)
            return updatedSets
        })
    }

    const delSet = (key: string) => {
        setSetsData((previous) => {
            const updatedSets = previous.filter((set) => set.set_id !== key)
            props.onChange(props.trackingId, updatedSets)
            return updatedSets
        })
    }

    const updateSetData = (key: string, field: 'weight' | 'repetitions', value: number) => {
        // Convert to kg
        if (field === 'weight' && unit === 'Lbs') {
            value = Math.round((value / 2.205) * 10) / 10
        }

        setSetsData((previous) => {
            const updatedSets = previous.map((set) =>
                set.set_id === key ? { ...set, [field]: value } : set
            )

            props.onChange(props.trackingId, updatedSets)
            return updatedSets
        })
    }

    const updateUnit = (unit: string) => {
        setUnit(unit)
    }

    return (
        <div>
            <div className='flex flex-row justify-between content-center items-center'>
                <WeightUnitSelector onChange={updateUnit} />
            </div>

            <Spacer y={4} />

            {setsData.map((set) => (
                <div
                    key={set.set_id}
                    className='flex flex-row content-center items-center pb-2 space-x-2'>
                    <Input
                        type='number'
                        aria-label='Répétitions'
                        placeholder='Répétitions'
                        size='sm'
                        inputMode='numeric'
                        onChange={(e) =>
                            updateSetData(set.set_id, 'repetitions', Number(e.target.value))
                        }
                    />
                    <Input
                        type='number'
                        placeholder='Charge'
                        aria-label='Répétitions'
                        size='sm'
                        endContent={<p className='description text-sm'>{unit}</p>}
                        onChange={(e) => {
                            updateSetData(set.set_id, 'weight', Number(e.target.value))
                        }}
                        inputMode='numeric'
                    />
                    <Button
                        onClick={() => {
                            delSet(set.set_id)
                        }}
                        variant='flat'
                        color='danger'
                        className='rounded-full'
                        size='sm'
                        isIconOnly>
                        <XMarkIcon className='size-5' />
                    </Button>
                </div>
            ))}

            <Spacer y={4} />
            <div className='flex flex-row justify-center'>
                <Button size='sm' className='text-[#44a2c2] bg-[#E3EBF9]' onClick={addSet}>
                    Ajouter un set
                </Button>
            </div>
            <Spacer y={4} />
        </div>
    )
}
