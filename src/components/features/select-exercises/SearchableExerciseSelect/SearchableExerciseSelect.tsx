import * as React from 'react'
import { Exercise } from '../../../../type'
import { Input, Spacer } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { ExercisesList } from './elements/ExercisesList'

export interface ISearchableExerciseSelectProps {
    exercises: Exercise[]
    to?: string
    onSelect?: (exerciseId: string) => void
}

export function SearchableExerciseSelect(props: ISearchableExerciseSelectProps) {
    const [searchValue, setSearchBValue] = React.useState('')
    const navigate = useNavigate()

    const onSelect = (exerciseId: string) => {
        console.log(exerciseId)
        if (props.to) {
            navigate(`${props.to}?exercise_id=${exerciseId}`)
        }

        if (props.onSelect) {
            props.onSelect(exerciseId)
        }
    }

    return (
        <>
            <Input
                type='text'
                placeholder='Chercher un exercice'
                value={searchValue}
                onValueChange={setSearchBValue}
                endContent={<MagnifyingGlassIcon className='size-4' />}></Input>
            <Spacer y={4} />
            <div className='h-[78%] overflow-y-auto'>
                <ExercisesList
                    exercises={props.exercises}
                    filter={searchValue}
                    onSelect={onSelect}
                />
            </div>
        </>
    )
}
