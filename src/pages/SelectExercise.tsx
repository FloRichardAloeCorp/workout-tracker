import { Exercise } from '../type'
import { SearchableExerciseSelect } from '../components/features/select-exercises/SearchableExerciseSelect/SearchableExerciseSelect'
import { Spacer } from '@nextui-org/react'

export interface ISelectExerciseProps {
    exercises: Exercise[]
    to: string
}

export function SelectExercise(props: ISelectExerciseProps) {
    return (
        <div className='relative h-full'>
            <h1>Sélectionnez un exercice</h1>
            <Spacer y={12} />
            <div className='h-[95%]'>
                <SearchableExerciseSelect exercises={props.exercises} to={props.to} />
            </div>
        </div>
    )
}
