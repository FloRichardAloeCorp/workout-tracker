import * as React from 'react'

import { useNavigate } from 'react-router-dom'
import { Exercise, Profile } from '../type'
import { Card, CardBody, CardHeader, Spacer } from '@nextui-org/react'
import { WeeklyTrainings } from '../components/weekly-trainings/WeeklyTrainings'
import { SelectExerciseAutocomplete } from '../components/select-exercise/SelectExerciseAutocomplete'

export interface IStatsProps {
    profile: Profile | undefined
    exercises: Exercise[]
}

export function Stats(props: IStatsProps) {
    const navigate = useNavigate()

    const onSelectExercise = (key: React.Key | null) => {
        if (key) {
            navigate(`/stats/exercise?exercise_id=${key.toString()}`)
        }
    }

    return (
        <div>
            <h1>Progression</h1>
            <Spacer y={12} />
            {props.profile && (
                <>
                    <Spacer y={4} />
                    <WeeklyTrainings profile={props.profile} />
                </>
            )}
            <Spacer y={8} />
            <Card>
                <CardHeader className='flex flex-col items-start'>
                    <h2>Progression par exercice</h2>
                </CardHeader>
                <p className='description text-center'>
                    Consultez votre progression en sélectionnant un exercice.
                </p>
                <CardBody>
                    <SelectExerciseAutocomplete
                        exercises={props.exercises}
                        onSelect={onSelectExercise}
                    />
                </CardBody>
            </Card>
        </div>
    )
}
