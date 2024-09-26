import { Button, Input, Spacer } from '@nextui-org/react'
import { Set } from '../../../../type'
import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { WeightUnitSelector } from './elements/WeightUnitSelector'

export interface IExerciseRecorderProps {
    sets: Set[]
    onValidate: (sets: Set[]) => void
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
            return updatedSets
        })
    }

    const delSet = (key: string) => {
        setSetsData((previous) => {
            const updatedSets = previous.filter((set) => set.set_id !== key)
            return updatedSets
        })
    }

    const updateSetData = (key: string, field: 'weight' | 'repetitions', value: number) => {
        setSetsData((previous) => {
            const updatedSets = previous.map((set) =>
                set.set_id === key ? { ...set, [field]: value } : set
            )

            return updatedSets
        })
    }

    const validateSets = () => {
        let sets: Set[] = []
        if (unit === 'Lbs') {
            sets = setsData.map((set) => {
                return { ...set, weight: Math.round((set.weight / 2.205) * 10) / 10 }
            })
        } else {
            sets = setsData
        }

        props.onValidate(sets)
    }

    useEffect(() => {
        setSetsData(() => {
            if (props.sets.length === 0) {
                return [{ set_id: crypto.randomUUID(), weight: 0, repetitions: 0 }]
            }

            return props.sets
        })
    }, [props.sets])

    useEffect(() => {
        if (unit === 'Lbs') {
            setSetsData((previous) => {
                return previous.map((set) => {
                    return { ...set, weight: Math.round(set.weight * 2.205 * 10) / 10 }
                })
            })
        } else if (unit === 'Kg') {
            setSetsData((previous) => {
                return previous.map((set) => {
                    return { ...set, weight: Math.round((set.weight / 2.205) * 10) / 10 }
                })
            })
        }
    }, [unit])

    return (
        <div className='h-full flex flex-col justify-between'>
            <div>
                <div className='w-full flex flex-row justify-between items-center'>
                    <WeightUnitSelector onChange={setUnit} />

                    <Button size='sm' className='text-[#44a2c2] bg-[#E3EBF9]' onClick={addSet}>
                        Ajouter un set
                    </Button>
                </div>

                <Spacer y={8} />

                <div className='h-[30rem] overflow-y-auto'>
                    {setsData.map((set) => (
                        <div
                            key={set.set_id}
                            className=' flex flex-row content-center items-center pb-2 space-x-2 '>
                            <Input
                                type='number'
                                aria-label='Répétitions'
                                placeholder='Répétitions'
                                size='md'
                                inputMode='numeric'
                                value={
                                    set.repetitions !== 0 ? set.repetitions.toString() : undefined
                                }
                                onChange={(e) =>
                                    updateSetData(set.set_id, 'repetitions', Number(e.target.value))
                                }
                            />
                            <Input
                                type='number'
                                placeholder='Charge'
                                aria-label='Charge'
                                size='md'
                                value={set.weight !== 0 ? set.weight.toString() : undefined}
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
                                size='md'
                                isIconOnly>
                                <XMarkIcon className='size-5' />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <Button className='text-[#37b88d] bg-[#3fcd9e43]' onClick={validateSets}>
                Valider les séries
            </Button>
        </div>
    )
}
