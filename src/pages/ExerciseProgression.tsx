import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getExercisebyId } from '../api/exercises'
import { StrongArm } from '../assets/StrongArm'
import { Weight } from '../assets/weight'
import { ProgressChart } from '../components/ProgressChart'
import { SetEvolution } from '../components/SetEvolution'
import { Exercise, ExerciseTracking, ChartDataPoint, Profile, Set } from '../type'
import { Card, CardBody, CardHeader, Spacer } from '@nextui-org/react'
import { ButtonBarItems, ButtonBarSelector } from '../components/ButtonBarSelector'

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
    const [avgWeightByTraining, setAvgWeightByTraining] = React.useState<ChartDataPoint[]>([])
    const [exerciseProgressionTimeWindow, setExerciseProgressionTimeWindow] = React.useState('')

    const navigate = useNavigate()

    React.useEffect(() => {
        const exerciseId = searchParams.get('exercise_id')
        if (!exerciseId) {
            return
        }
        getExercisebyId(exerciseId).then((res) => setExercise(res))

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
    }, [props.profile?.trainings, searchParams, navigate, props.profile])

    React.useEffect(() => {
        if (trackings.length > 0) {
            const lastSet = trackings[trackings.length - 1].sets
            computeTotalLiftedWeight(lastSet)
            computeTotalReps(lastSet)
        }
        computeAvgWeightByTraining(trackings)
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

    const computeAvgWeightByTraining = (trackings: ExerciseTracking[]) => {
        const data: ChartDataPoint[] = []
        trackings.forEach((tracking) => {
            let sum = 0
            let count = 0
            tracking.sets.forEach((set) => {
                sum += set.weight
                count++
            })
            if (count > 0) {
                data.push({
                    date: tracking.date.toDate(),
                    value: sum / count,
                })
            }
            sum = 0
            count = 0
        })
        setAvgWeightByTraining(data)
    }

    const buttonBarItems: ButtonBarItems[] = [
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
        <div>
            <h1>{exercise?.name}</h1>
            <div className='max-h-[700px] overflow-y-auto no-scrollbar'>
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
                            <Card
                                className='w-[47%] h-full bg-[#FEEFC2] text-[#09231B]'
                                shadow='none'>
                                <CardHeader className='items-center justify-center'>
                                    <Weight className='size-9' color='#FFDB95' />
                                </CardHeader>
                                <CardBody className='justify-center items-center'>
                                    <p className='font-semibold'>{totalLiftedWeight} Kg</p>
                                    <p className='description'> Cumul des charges</p>
                                </CardBody>
                            </Card>
                            <Card
                                className='w-[47%]  h-full bg-[#E8E5F1] text-[#211B2E]'
                                shadow='none'>
                                <CardHeader className='items-center justify-center'>
                                    <StrongArm className='size-9' color='#b3adc5' />
                                </CardHeader>
                                <CardBody className='justify-center items-center'>
                                    <p className='font-semibold'>{totalReps} Reps</p>
                                    <p className='description'> Cumul des répétitions</p>
                                </CardBody>
                            </Card>
                        </div>
                        <Spacer y={8} />
                        {trackings.length > 1 ? (
                            <div>
                                <h2>Progression</h2>
                                <p className='description'>
                                    Comparaison entre les deux dernières séances.
                                </p>
                                <Spacer y={4} />
                                <SetEvolution
                                    baseSets={trackings[trackings.length - 2].sets}
                                    newSets={trackings[trackings.length - 1].sets}
                                />
                            </div>
                        ) : null}
                        <Spacer y={8} />
                        <h2>Evolution du poid moyen par séances</h2>
                        <Spacer y={4} />
                        <div className='text-right'>
                            <ButtonBarSelector
                                baseBackgroundColor='#E3EBF9'
                                baseTextColor='#44a2c2'
                                items={buttonBarItems}
                                onSelect={setExerciseProgressionTimeWindow}
                            />
                        </div>
                        <ProgressChart dataSet={avgWeightByTraining} YAxisUnit='kg' />
                    </>
                )}
            </div>
        </div>
    )
}
