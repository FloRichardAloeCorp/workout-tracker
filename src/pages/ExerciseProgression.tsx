import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LoadProgressionChart } from '../components/features/exercise-progression/Charts/LoadProgressionChart'
import { Exercise, ExerciseTracking, Profile, Set } from '../type'
import { Spacer } from '@nextui-org/react'
import {
    ButtonsBarItems,
    ButtonsBarSelector,
} from '../components/shared/ui/ButtonsBarSelector/ButtonsBarSelector'

import { SetEvolutionTable } from '../components/features/exercise-progression/SetEvolutionTable/SetEvolutionTable'
import { GoBackHeader } from '../components/shared/headers/GoBackHeader/GoBackHeader'
import { RepetitionProgressionChart } from '../components/features/exercise-progression/Charts/RepetitionProgressionChart'
import { LastTrainingSummary } from '../components/features/exercise-progression/LastTrainingSummary/LastTrainingSummary'
import { format } from 'date-fns'

export interface IExerciseProgressionProps {
    profile: Profile | undefined
    exercises: Exercise[]
}

export function ExerciseProgression(props: IExerciseProgressionProps) {
    const [searchParams] = useSearchParams()
    const [exercise, setExercise] = React.useState<Exercise>()
    const [trackings, setTrackings] = React.useState<ExerciseTracking[]>([])
    const [exerciseProgressionTimeWindow, setExerciseProgressionTimeWindow] = React.useState('')

    const navigate = useNavigate()

    React.useEffect(() => {
        const exerciseId = searchParams.get('exercise_id')
        if (!exerciseId) {
            return
        }

        setExercise(() => {
            return props.exercises.find((exercise) => exercise.exercise_id === exerciseId)
        })

        setTrackings(() => {
            const exerciseTrackings: ExerciseTracking[] = []
            props.profile?.trainings.forEach((training) => {
                const matchingTrackings = training.trackings.find(
                    (tracking) => tracking.exercise_id === exerciseId
                )
                if (matchingTrackings) {
                    exerciseTrackings.push(matchingTrackings)
                }
            })

            return exerciseTrackings
        })
    }, [props.profile?.trainings, searchParams, navigate, props.profile, props.exercises])

    const buttonBarItems: ButtonsBarItems[] = [
        {
            label: 'Mois',
            value: 'month',
            key: 'month',
        },
        {
            label: '3 derniers mois',
            value: '3months',
            key: '3months',
        },
        {
            label: '6 derniers mois',
            value: '6months',
            key: '6months',
        },
    ]

    return (
        <div className='relative h-full'>
            <GoBackHeader title={`${exercise?.name}`} />

            <div className='max-h-[93%] overflow-y-auto no-scrollbar'>
                <Spacer y={12} />
                {trackings.length === 0 ? (
                    <div className='flex flex-row items-center justify-center'>
                        <p className='text-center text-xl font-semibold text-gray-400'>
                            Aucune donnée disponible
                        </p>
                    </div>
                ) : (
                    <>
                        <h2>Dernière séance</h2>
                        <p className='description'>
                            {format(trackings[trackings.length - 1].date.toDate(), 'dd/MM/yyyy')}
                        </p>
                        <Spacer y={4} />

                        <LastTrainingSummary sets={trackings[trackings.length - 1].sets} />

                        <Spacer y={8} />

                        {trackings.length > 1 ? (
                            <div>
                                <h2>Progression</h2>
                                <p className='description'>
                                    Comparaison entre les deux dernières séances.
                                </p>
                                <Spacer y={4} />
                                <SetEvolutionTable
                                    baseSets={trackings[trackings.length - 2].sets}
                                    newSets={trackings[trackings.length - 1].sets}
                                />
                            </div>
                        ) : null}

                        <Spacer y={8} />

                        <h2>Évolution par séance</h2>

                        <Spacer y={4} />

                        {/* <div className='text-right'>
                            <ButtonsBarSelector
                                baseBackgroundColor='#E3EBF9'
                                baseTextColor='#44a2c2'
                                items={buttonBarItems}
                                onSelect={setExerciseProgressionTimeWindow}
                            />
                        </div> */}

                        <h3 className='description font-semibold'>Charge moyenne par séance</h3>

                        <LoadProgressionChart trackings={trackings} />

                        <Spacer y={4} />

                        <h3 className='description font-semibold'>
                            Répétitions moyennes par séance
                        </h3>

                        <RepetitionProgressionChart trackings={trackings} />
                    </>
                )}
            </div>
        </div>
    )
}
