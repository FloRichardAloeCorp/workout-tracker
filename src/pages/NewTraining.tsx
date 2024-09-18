import * as React from 'react'
import { Header } from '../components/Header'
import { TrackExercise } from '../components/TrackExercise'

import { Exercise, ExerciseTracking, Set } from '../type'
import {
    Accordion,
    AccordionItem,
    Button,
    DatePicker,
    Divider,
    Select,
    SelectItem,
} from '@nextui-org/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import Store from '../store/store'
import { getLocalTimeZone, today } from '@internationalized/date'

export interface INewTrainingProps {}

export function NewTraining(props: INewTrainingProps) {
    const [selectedExerciseId, setSelectedExerciseId] = React.useState('')
    const [exercises, setExercises] = React.useState<Exercise[]>([])
    const [trackings, setTrackings] = React.useState<ExerciseTracking[]>([])
    const [selectedDate, setSelectedDate] = React.useState(today(getLocalTimeZone()))

    const setsStore = React.useRef<any[]>([])

    React.useEffect(() => {
        fetchExercises()
    }, [])

    const fetchExercises = async () => {
        setExercises([
            {
                id: '1',
                name: 'Développé couché',
            },
            {
                id: '2',
                name: 'Tirage vertical',
            },
            {
                id: '3',
                name: 'Squat',
            },
        ])
    }

    const addTracking = () => {
        const trackingId = crypto.randomUUID()
        setTrackings([
            ...trackings,
            { id: trackingId, exerciseId: selectedExerciseId, sets: [], date: new Date() },
        ])
        setsStore.current.push({ id: trackingId, sets: [] })
    }

    const deleteTracking = (trackingId: string) => {
        setTrackings(trackings.filter((tracking) => tracking.id !== trackingId))
        setsStore.current = setsStore.current.filter((set) => set.id !== trackingId)
    }

    const findExerciseNameFromId = (exerciseId: string) => {
        return exercises.find((exercise) => exercise.id === exerciseId)?.name || ''
    }

    const updateSets = (trackingId: string, sets: Set[]) => {
        setsStore.current = setsStore.current.map((set) =>
            set.id === trackingId ? { ...set, sets: sets } : set
        )
    }

    const validateTraining = () => {
        console.log(getLocalTimeZone())
        const trackingsData: ExerciseTracking[] = []
        trackings.forEach((tracking, i) => {
            trackingsData.push({
                exerciseId: tracking.exerciseId,
                id: tracking.id,
                sets: setsStore.current[i].sets,
                date: selectedDate.toDate(getLocalTimeZone()),
            })
        })

        Store.addTraining({
            date: selectedDate.toDate(getLocalTimeZone()),
            trackings: trackingsData,
        })
    }

    return (
        <div className='App'>
            <Header></Header>
            <DatePicker
                label='Date de la séance'
                showMonthAndYearPickers
                visibleMonths={1}
                className='mb-3'
                value={selectedDate}
                onChange={setSelectedDate}
            />
            <Divider className='mb-3' />
            <div className='space-y-2 mb-3'>
                <Accordion variant='splitted' keepContentMounted className='mb-3' isCompact>
                    {trackings.map((tracking) => (
                        <AccordionItem
                            key={tracking.id}
                            aria-label='Développé couché'
                            title={findExerciseNameFromId(tracking.exerciseId)}
                            HeadingComponent={'p'}
                            startContent={
                                <Button
                                    variant='light'
                                    isIconOnly
                                    onClick={() => {
                                        deleteTracking(tracking.id)
                                    }}>
                                    <TrashIcon className='size-5' />
                                </Button>
                            }>
                            <TrackExercise trackingId={tracking.id} onChange={updateSets} />
                        </AccordionItem>
                    ))}
                </Accordion>

                <Select
                    label='Sélectionnez un exercice'
                    items={exercises}
                    selectedKeys={selectedExerciseId}
                    onChange={(e) => {
                        setSelectedExerciseId(e.target.value)
                    }}>
                    {(exercise) => <SelectItem key={exercise.id}>{exercise.name}</SelectItem>}
                </Select>

                <Button onClick={addTracking}>Nouvel exercice</Button>
            </div>

            <div className='fixed bottom-2 right-2'>
                <Button color='primary' variant='shadow' onClick={validateTraining}>
                    Valider la séance
                </Button>
            </div>
        </div>
    )
}
