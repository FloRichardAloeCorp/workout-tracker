import * as React from 'react'
import { Exercise } from '../../../../../type'
import { Button } from '@nextui-org/react'

export interface IExercisesListProps {
    exercises: Exercise[]
    filter: string
    onSelect: (exerciseId: string) => void
}

export function ExercisesList(props: IExercisesListProps) {
    const [displayedExercise, setDisplayedExercise] = React.useState<Exercise[]>([])

    React.useEffect(() => {
        if (props.filter === '') {
            setDisplayedExercise(props.exercises)
        }

        setDisplayedExercise(() => {
            return props.exercises.filter((exercise) => {
                return exercise.name.toLowerCase().includes(props.filter.toLowerCase())
            })
        })
    }, [props.filter, props.exercises])

    return (
        <div className='grid grid-cols-2 gap-2'>
            {displayedExercise.map((exercise) => (
                <Button
                    key={exercise.exercise_id}
                    className='text-[#44a2c2] bg-[#E3EBF9] '
                    value={exercise.exercise_id}
                    onClick={() => props.onSelect(exercise.exercise_id)}>
                    <p className='truncate'>{exercise.name}</p>
                </Button>
            ))}
        </div>
    )
}
