import * as React from 'react'
import { Header } from '../components/Header'
import { useSearchParams } from 'react-router-dom'
import { ChartDataPoint, Exercise, ExerciseTracking, Set } from '../type'
import { getExercisebyId } from '../api/exercises'
import { SetEvolution } from '../components/SetEvolution'
import { Weight } from '../assets/weight'
import { StatCard } from '../components/StatCard'
import { StrongArm } from '../assets/StrongArm'
import { ProgressChart } from '../components/ProgressChart'
import Store from '../store/store'
import { XMarkIcon } from '@heroicons/react/24/outline'

// const data = [
//     {
//         date: new Date('2024-04-10T10:20:30Z'),
//         exerciseId: '1',
//         id: '1',
//         sets: [
//             {
//                 id: '1',
//                 repetitions: 3,
//                 weight: 20,
//             },
//             {
//                 id: '1',
//                 repetitions: 4,
//                 weight: 20,
//             },
//             {
//                 id: '1',
//                 repetitions: 3,
//                 weight: 20,
//             },
//             {
//                 id: '1',
//                 repetitions: 7,
//                 weight: 20,
//             },
//         ],
//     },
//     {
//         date: new Date('2024-04-11T10:20:30Z'),
//         exerciseId: '1',
//         id: '1',
//         sets: [
//             {
//                 id: '1',
//                 repetitions: 3,
//                 weight: 30,
//             },
//             {
//                 id: '1',
//                 repetitions: 4,
//                 weight: 30,
//             },
//             {
//                 id: '1',
//                 repetitions: 3,
//                 weight: 35,
//             },
//             {
//                 id: '1',
//                 repetitions: 7,
//                 weight: 10,
//             },
//         ],
//     },
//     {
//         date: new Date('2024-04-12T10:20:30Z'),
//         exerciseId: '1',
//         id: '2',
//         sets: [
//             {
//                 id: '2',
//                 repetitions: 2,
//                 weight: 37,
//             },
//             {
//                 id: '1',
//                 repetitions: 4,
//                 weight: 22,
//             },
//             {
//                 id: '1',
//                 repetitions: 7,
//                 weight: 35,
//             },
//             {
//                 id: '1',
//                 repetitions: 8,
//                 weight: 12,
//             },
//             {
//                 id: '1',
//                 repetitions: 7,
//                 weight: 10,
//             },
//         ],
//     },
// ]

export interface IStatsProps {}

export function Stats(props: IStatsProps) {
    const [searchParams] = useSearchParams()
    const [exercise, setExercise] = React.useState<Exercise>()
    const [trackings, setTrackings] = React.useState<ExerciseTracking[]>([])
    const [totalLiftedWeight, setTotalLiftedWeight] = React.useState(0)
    const [totalReps, setTotalReps] = React.useState(0)
    const [avgWeightByTraining, setAvgWeightByTraining] = React.useState<ChartDataPoint[]>([])

    React.useEffect(() => {
        const exerciseId = searchParams.get('exercise_id')
        if (!exerciseId) {
            return
        }
        getExercisebyId(exerciseId).then((res) => setExercise(res))

        const trackings = Store.findExcersiceTrackings(exerciseId)
        console.log(trackings)
        setTrackings(trackings)

        if (trackings.length > 0) {
            const lastSet = trackings[trackings.length - 1].sets
            computeTotalLiftedWeight(lastSet)
            computeTotalReps(lastSet)
        }

        computeAvgWeightByTraining(trackings)
    }, [searchParams])

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
                    date: new Date(tracking.date),
                    value: sum / count,
                })
            }
            sum = 0
            count = 0
        })
        setAvgWeightByTraining(data)
    }

    return (
        <div>
            <Header></Header>
            <h1>{exercise?.name}</h1>
            {trackings.length === 0 ? (
                <div className='flex flex-row items-center justify-center'>
                    <p className='text-center text-xl font-semibold text-gray-400'>
                        Aucune donnée disponible
                    </p>
                </div>
            ) : (
                <>
                    <h2>Dernière séance</h2>
                    <div className='flex flex-row justify-around my-3'>
                        <StatCard
                            title='Poid soulevé'
                            stat={`${totalLiftedWeight} Kg`}
                            icon={<Weight className='size-5' />}
                        />
                        <StatCard
                            title='Répétitions'
                            stat={`${totalReps} Reps`}
                            icon={<StrongArm className='size-5' />}
                        />
                    </div>
                    <h2>Progression</h2>
                    {trackings.length > 1 ? (
                        <div>
                            <p className='description'>
                                Comparaison entre les deux dernières séances.
                            </p>
                            <SetEvolution
                                baseSets={trackings[trackings.length - 2].sets}
                                newSets={trackings[trackings.length - 1].sets}
                            />
                        </div>
                    ) : null}
                    <h2 className='mb-2'>Evolution du poid moyen par séances</h2>
                    <ProgressChart dataSet={avgWeightByTraining} YAxisUnit='kg' />
                </>
            )}
        </div>
    )
}
