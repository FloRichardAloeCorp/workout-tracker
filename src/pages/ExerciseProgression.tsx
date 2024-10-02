import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StrongArm } from '../assets/StrongArm'
import { LoadProgressionChart } from '../components/features/exercise-progression/Charts/LoadProgressionChart'
import { Exercise, ExerciseTracking, Profile, Set } from '../type'
import { Spacer } from '@nextui-org/react'
import {
    ButtonsBarItems,
    ButtonsBarSelector,
} from '../components/shared/ui/ButtonsBarSelector/ButtonsBarSelector'
import { InfoCard } from '../components/shared/ui/InfoCard/InfoCard'

import { SetEvolutionTable } from '../components/features/exercise-progression/SetEvolutionTable/SetEvolutionTable'
import { WeightLogo } from '../assets/WeightLogo'
import { GoBackHeader } from '../components/shared/headers/GoBackHeader/GoBackHeader'
import { RepetitionProgressionChart } from '../components/features/exercise-progression/Charts/RepetitionProgressionChart'

export interface IExerciseProgressionProps {
    profile: Profile | undefined
    exercises: Exercise[]
}

export function ExerciseProgression(props: IExerciseProgressionProps) {
    const [searchParams] = useSearchParams()
    const [exercise, setExercise] = React.useState<Exercise>()
    const [trackings, setTrackings] = React.useState<ExerciseTracking[]>([])
    const [totalLiftedWeight, setTotalLiftedWeight] = React.useState(0)
    const [totalReps, setTotalReps] = React.useState(0)
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

    React.useEffect(() => {
        if (trackings.length > 0) {
            const lastSet = trackings[trackings.length - 1].sets
            computeTotalLiftedWeight(lastSet)
            computeTotalReps(lastSet)
        }
    }, [trackings])

    const computeTotalLiftedWeight = (sets: Set[]) => {
        let sum = 0
        sets.forEach((set) => {
            sum += set.weight
        })
        setTotalLiftedWeight(sum)
    }

    const computeTotalReps = (sets: Set[]) => {
        let sum = 0
        sets.forEach((set) => {
            sum += set.repetitions
        })
        setTotalReps(sum)
    }

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
            value: '36months',
            key: '36months',
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
                        <Spacer y={4} />
                        <div className='flex flex-row justify-around'>
                            <InfoCard
                                content={`${totalLiftedWeight} Kg`}
                                description='Cumul des charges'
                                icon={<WeightLogo className='size-9' />}
                                color='yellow'
                            />
                            <InfoCard
                                content={`${totalReps} Reps`}
                                description='Cumul des répétitions'
                                icon={<StrongArm className='size-9' />}
                                color='purple'
                            />
                        </div>
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
