import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import * as React from 'react'
import { Exercise } from '../../type'

export interface ISelectExerciseAutocompleteProps {
    exercises: Exercise[]
    onSelect: (key: React.Key | null) => void
}

export function SelectExerciseAutocomplete(props: ISelectExerciseAutocompleteProps) {
    const [selectedExcercise, setSelectedExcercise] = React.useState('')

    const onSelect = (key: React.Key | null) => {
        if (key) {
            setSelectedExcercise(key.toString())
            props.onSelect(key.toString())
            setSelectedExcercise('')
        }
    }
    return (
        <Autocomplete
            defaultItems={props.exercises}
            label='Exercices'
            placeholder='Chercher un exercice'
            className='max-w-xs'
            selectedKey={selectedExcercise}
            onSelectionChange={onSelect}>
            {(exercise) => (
                <AutocompleteItem key={exercise.exercise_id}>{exercise.name}</AutocompleteItem>
            )}
        </Autocomplete>
    )
}
