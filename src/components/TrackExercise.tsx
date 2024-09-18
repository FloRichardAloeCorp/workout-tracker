import { Button, Input } from '@nextui-org/react'
import { Set } from '../type'
import { useState } from 'react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { WeightUnitSelector } from './WeightUnitSelector'

export interface ITrackExerciseProps {
    trackingId: string
    onChange: (trackingId: string, sets: Set[]) => void
    // onValidate: (tracking: ExerciseTracking) => void
}

export function TrackExercise(props: ITrackExerciseProps) {
    const [unit, setUnit] = useState('Kg')
    const [setsData, setSetsData] = useState<Set[]>([])

    const addSet = () => {
        setSetsData((previous) => {
            const updatedSets = [
                ...previous,
                { id: crypto.randomUUID(), weight: 0, repetitions: 0 },
            ]
            props.onChange(props.trackingId, updatedSets)
            return updatedSets
        })
    }

    const delSet = (key: string) => {
        setSetsData((previous) => {
            const updatedSets = previous.filter((set) => set.id !== key)
            props.onChange(props.trackingId, updatedSets)
            return updatedSets
        })
    }

    const updateSetData = (key: string, field: 'weight' | 'repetitions', value: number) => {
        setSetsData((previous) => {
            const updatedSets = previous.map((set) =>
                set.id === key ? { ...set, [field]: value } : set
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
            <div className='flex flex-row justify-between content-center items-center mb-3'>
                <WeightUnitSelector onChange={updateUnit} />
            </div>

            {setsData.map((set) => (
                <div
                    key={set.id}
                    className='flex flex-row content-center items-center pl-2 mb-2 space-x-2'>
                    <Button
                        onClick={() => {
                            delSet(set.id)
                        }}
                        variant='light'
                        isIconOnly>
                        <TrashIcon className='size-5' />
                    </Button>
                    <Input
                        type='number'
                        label='Poid'
                        labelPlacement='inside'
                        size='sm'
                        endContent={<p className='text-sm'>{unit}</p>}
                        onChange={(e) => updateSetData(set.id, 'weight', Number(e.target.value))}
                    />
                    <Input
                        type='number'
                        label='Répétitions'
                        labelPlacement='inside'
                        size='md'
                        onChange={(e) =>
                            updateSetData(set.id, 'repetitions', Number(e.target.value))
                        }
                    />
                </div>
            ))}

            <div className='flex flex-col gap-3 items-center w-full'>
                <div className='flex flex-row w-full justify-end'>
                    <Button color='primary' isIconOnly className='rounded-full' onClick={addSet}>
                        <PlusIcon className='size-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}
