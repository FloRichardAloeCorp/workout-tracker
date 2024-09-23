import * as React from 'react'
import { Exercise } from '../../../../../type'
import { Button, Spacer } from '@nextui-org/react'
import { GroupedExercises } from './ExercisesList.type'

export interface IExercisesListProps {
    exercises: Exercise[]
    filter: string
    onSelect: (exerciseId: string) => void
}

export function ExercisesList(props: IExercisesListProps) {
    const [displayedExercise, setDisplayedExercise] = React.useState<GroupedExercises>({})

    React.useEffect(() => {
        if (props.filter === '') {
            setDisplayedExercise(groupExerciseByCategory(props.exercises))
            return
        }

        setDisplayedExercise(() => {
            const filteredExercises = props.exercises.filter((exercise) => {
                return exercise.name.toLowerCase().includes(props.filter.toLowerCase())
            })

            return groupExerciseByCategory(filteredExercises)
        })
    }, [props.filter, props.exercises])

    const groupExerciseByCategory = (exercises: Exercise[]) => {
        const groupedExercises = exercises.reduce<GroupedExercises>((acc, exercise) => {
            // Si la catégorie n'existe pas encore dans l'accumulateur, on l'initialise
            if (!acc[exercise.category]) {
                acc[exercise.category] = []
            }
            // Ajouter l'exercice à la catégorie correspondante
            acc[exercise.category].push(exercise)
            return acc
        }, {})

        return groupedExercises
    }

    return (
        <div>
            {Object.entries(displayedExercise).map(([category, exercises]) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <Spacer y={2} />
                    <div className='grid grid-cols-2 gap-2'>
                        {exercises.map((exercise) => (
                            <Button
                                key={exercise.exercise_id}
                                className='text-[#44a2c2] bg-[#E3EBF9] '
                                value={exercise.exercise_id}
                                onClick={() => props.onSelect(exercise.exercise_id)}>
                                <p className='truncate'>{exercise.name}</p>
                            </Button>
                        ))}
                    </div>
                    <Spacer y={4} />
                </div>
            ))}
        </div>
    )
}
