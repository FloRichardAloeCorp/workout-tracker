import * as React from 'react'
import { TrackExercise } from '../components/TrackExercise'

import { Exercise, ExerciseTracking, Set } from '../type'
import {
    Accordion,
    AccordionItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    DatePicker,
    Divider,
    Spacer,
    useDisclosure,
} from '@nextui-org/react'

import { TrashIcon } from '@heroicons/react/24/outline'
import { getLocalTimeZone, today } from '@internationalized/date'
import { useNavigate } from 'react-router-dom'
import { addTraining } from '../api/profile'
import { auth } from '../firebase'
import { Timestamp } from 'firebase/firestore'
import { StopWatch } from '../components/Stopwatch'
import { SelectExerciseModal } from '../components/select-exercise/SelectExerciseModal'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/solid'
import { isToday } from 'date-fns'

export interface INewTrainingProps {
    exercises: Exercise[]
}

export function NewTraining(props: INewTrainingProps) {
    const [trackings, setTrackings] = React.useState<ExerciseTracking[]>([])
    const [selectedDate, setSelectedDate] = React.useState(today(getLocalTimeZone()))
    const selectExerciseModalDiscosure = useDisclosure()

    const [trainingDuration, setTrainingDuration] = React.useState(0)
    const [endTraining, setEndTraining] = React.useState(false)

    const navigate = useNavigate()
    const setsStore = React.useRef<any[]>([])

    const addTracking = (exerciseId: string) => {
        const trackingId = crypto.randomUUID()
        setTrackings([
            ...trackings,
            {
                exercise_tracking_id: trackingId,
                exercise_id: exerciseId,
                sets: [],
                date: Timestamp.now(),
            },
        ])
        setsStore.current.push({ id: trackingId, sets: [] })
    }

    const deleteTracking = (trackingId: string) => {
        setTrackings(trackings.filter((tracking) => tracking.exercise_tracking_id !== trackingId))
        setsStore.current = setsStore.current.filter((set) => set.id !== trackingId)
    }

    const findExerciseNameFromId = (exerciseId: string) => {
        return props.exercises.find((exercise) => exercise.exercise_id === exerciseId)?.name || ''
    }

    const updateSets = (trackingId: string, sets: Set[]) => {
        setsStore.current = setsStore.current.map((set) =>
            set.id === trackingId ? { ...set, sets: sets } : set
        )
    }

    const validateTraining = React.useCallback(async () => {
        const trackingsData: ExerciseTracking[] = []

        const today = new Date()
        const date = selectedDate.toDate(getLocalTimeZone())
        if (isToday(date)) {
            date.setHours(today.getHours(), today.getMinutes(), today.getSeconds())
        } else {
            date.setHours(12, 0, 0)
        }

        trackings.forEach((tracking, i) => {
            trackingsData.push({
                exercise_tracking_id: tracking.exercise_tracking_id,
                exercise_id: tracking.exercise_id,
                sets: setsStore.current[i].sets,
                date: Timestamp.fromDate(date),
            })
        })

        if (!auth.currentUser) {
            return
        }

        await addTraining(auth.currentUser.uid, {
            training_id: crypto.randomUUID(),
            start_date: Timestamp.fromDate(date),
            duration_in_secondes: trainingDuration,
            trackings: trackingsData,
        })

        navigate('/')
    }, [navigate, selectedDate, trackings, trainingDuration])

    // Validate training only if endTraining is set to true and
    // the component has received a training duration.
    React.useEffect(() => {
        if (endTraining && trainingDuration > 0) {
            validateTraining()
        }
    }, [endTraining, trainingDuration, validateTraining])

    // Date picker slot overriding not working forcing do to this
    document.querySelector('#datepicker > div')?.classList.add('!gap-0', 'pr-1')

    return (
        <div className='App overflow-y-hidden'>
            <h1 className='text-center '>Entrainement</h1>
            <Spacer y={12} />

            <div className='flex flex-row justify-around items-center h-32'>
                <Card className='w-[47%] h-full bg-[#FEEFC2] text-[#09231B]' shadow='none'>
                    <CardHeader className='items-center justify-center'>
                        <ClockIcon className='size-9 text-[#FFDB95]' />
                    </CardHeader>
                    <CardBody className='justify-center items-center'>
                        <StopWatch isRunning={!endTraining} onStop={setTrainingDuration} />
                    </CardBody>
                </Card>
                <Card className='w-[47%]  h-full bg-[#E8E5F1] text-[#211B2E]' shadow='none'>
                    <CardHeader className='items-center justify-center'>
                        <CalendarIcon className='size-9 text-[#b3adc5]' />
                    </CardHeader>
                    <CardBody className='justify-center items-center'>
                        <DatePicker
                            id='datepicker'
                            aria-label='Date'
                            classNames={{ innerWrapper: 'm-0' }}
                            size='sm'
                            value={selectedDate}
                            onChange={setSelectedDate}
                        />
                    </CardBody>
                </Card>
            </div>
            <Spacer y={4} />

            <Divider className='mb-3' />

            <div className='flex flex-row justify-between items-center'>
                <h2 className='text-left'>Exercices</h2>
                <Button
                    size='sm'
                    className='text-[#44a2c2] bg-[#E3EBF9]'
                    onClick={() => selectExerciseModalDiscosure.onOpen()}>
                    Ajouter
                </Button>
            </div>

            <Spacer y={8} />
            {trackings.length === 0 ? (
                <div className='description'>Ajoutez un execice pour commencer.</div>
            ) : (
                <div>
                    <div className='space-y-2 mb-3 max-h-[500px] overflow-y-auto py-2'>
                        {
                            <Accordion
                                variant='splitted'
                                keepContentMounted
                                className='mb-3'
                                isCompact>
                                {trackings.map((tracking) => (
                                    <AccordionItem
                                        key={tracking.exercise_tracking_id}
                                        aria-label='Développé couché'
                                        title={findExerciseNameFromId(tracking.exercise_id)}
                                        HeadingComponent={'p'}
                                        className='shadow-none border'
                                        startContent={
                                            <Button
                                                variant='flat'
                                                color='danger'
                                                isIconOnly
                                                onClick={() => {
                                                    deleteTracking(tracking.exercise_tracking_id)
                                                }}>
                                                <TrashIcon className='size-5 ' />
                                            </Button>
                                        }>
                                        <TrackExercise
                                            trackingId={tracking.exercise_tracking_id}
                                            onChange={updateSets}
                                        />
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        }
                    </div>

                    <Button
                        className='text-[#37b88d] bg-[#3fcd9e43]'
                        onClick={() => setEndTraining(true)}>
                        Valider la séance
                    </Button>
                </div>
            )}

            <SelectExerciseModal
                disclosure={selectExerciseModalDiscosure}
                onSelectedExercise={addTracking}
                exercises={props.exercises}
            />
        </div>
    )
}
