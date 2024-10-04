import * as React from 'react'

import { Exercise } from '../type'
import {
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
import { auth } from '../firebase'
import { Timestamp } from 'firebase/firestore'
import { StopWatch } from '../components/shared/ui/StopWatch/Stopwatch'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/solid'
import { isToday } from 'date-fns'
import { InfoCard } from '../components/shared/ui/InfoCard/InfoCard'
import { SearchableExerciseSelect } from '../components/features/select-exercises/SearchableExerciseSelect/SearchableExerciseSelect'
import { ProfileService } from '../services/ProfileService'
import { ConfirmationModal } from '../components/shared/confirmation/ConfirmationModal/ConfirmationModal'
import { useTrackingsContext } from '../components/features/new-training/TrackingsContext/TrackingsContext'

export interface INewTrainingProps {
    exercises: Exercise[]
    onValidate: () => void
}

export function NewTraining(props: INewTrainingProps) {
    const { trackings, setTrackings } = useTrackingsContext()
    const [selectedDate, setSelectedDate] = React.useState(today(getLocalTimeZone()))
    const confirmModalDisclosure = useDisclosure()

    const [showSelectExercise, setShowSelectExercise] = React.useState(false)
    const [trainingDuration, setTrainingDuration] = React.useState(0)
    const [endTraining, setEndTraining] = React.useState(false)

    const navigate = useNavigate()

    const addTracking = (exerciseId: string) => {
        setShowSelectExercise(false)
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
    }

    const deleteTracking = (trackingId: string) => {
        setTrackings(trackings.filter((tracking) => tracking.exercise_tracking_id !== trackingId))
    }

    const findExerciseNameFromId = (exerciseId: string) => {
        return props.exercises.find((exercise) => exercise.exercise_id === exerciseId)?.name || ''
    }

    const validateTraining = React.useCallback(async () => {
        const today = new Date()
        const date = selectedDate.toDate(getLocalTimeZone())
        if (isToday(date)) {
            date.setHours(today.getHours(), today.getMinutes(), today.getSeconds())
        } else {
            date.setHours(12, 0, 0)
        }

        let trackingsData = trackings.map((tracking) => {
            return { ...tracking, date: Timestamp.fromDate(date) }
        })

        if (!auth.currentUser) {
            return
        }

        await ProfileService.addTraining(auth.currentUser.uid, {
            training_id: crypto.randomUUID(),
            start_date: Timestamp.fromDate(date),
            duration_in_secondes: trainingDuration,
            trackings: trackingsData,
        })

        props.onValidate()

        navigate('/')
    }, [navigate, selectedDate, trackings, trainingDuration, props])

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
        <div className='relative h-full text-center'>
            <div className={`relative h-full ${showSelectExercise ? 'hidden' : ''}`}>
                <h1 className='text-center '>Entrainement</h1>
                <Spacer y={12} />

                <div className='flex flex-row justify-around items-center h-32'>
                    <InfoCard
                        color='yellow'
                        icon={<ClockIcon className='size-9' />}
                        height='32'
                        content={
                            <StopWatch isRunning={!endTraining} onStop={setTrainingDuration} />
                        }
                    />

                    <InfoCard
                        color='purple'
                        icon={<CalendarIcon className='size-9' />}
                        height='32'
                        content={
                            <DatePicker
                                id='datepicker'
                                aria-label='Date'
                                classNames={{ innerWrapper: 'm-0' }}
                                size='sm'
                                value={selectedDate}
                                onChange={setSelectedDate}
                            />
                        }
                    />
                </div>
                <Spacer y={4} />

                <Divider className='mb-3' />

                <div className='flex flex-row justify-between items-center'>
                    <h2 className='text-left'>Exercices</h2>
                    <Button
                        size='sm'
                        className='text-blue-400 bg-blue-100'
                        onClick={() => setShowSelectExercise(true)}>
                        Ajouter
                    </Button>
                </div>

                <Spacer y={8} />
                {trackings.length === 0 ? (
                    <div className='description'>Ajoutez un execice pour commencer.</div>
                ) : (
                    <div className='flex flex-col flex-grow justify-between'>
                        <div className='flex flex-col gap-y-2 h-80 overflow-y-auto px-2 py-2'>
                            {trackings.map((tracking) => (
                                <Card
                                    key={tracking.exercise_tracking_id}
                                    isPressable
                                    onPress={() => {
                                        navigate(
                                            `/new_training/record_exercise?tracking_id=${tracking.exercise_tracking_id}`,
                                            { state: { sets: tracking.sets } }
                                        )
                                    }}
                                    className='h-[6.5rem] min-h-[6.5rem]'
                                    shadow='sm'>
                                    <CardHeader className='items-center justify-between'>
                                        <p className='font-semibold text-sm'>
                                            {findExerciseNameFromId(tracking.exercise_id)}
                                        </p>
                                        <Button
                                            variant='light'
                                            isIconOnly
                                            onPress={() =>
                                                deleteTracking(tracking.exercise_tracking_id)
                                            }>
                                            <TrashIcon className='size-5 text-danger' />
                                        </Button>
                                    </CardHeader>
                                    <CardBody>
                                        <p className='description'>{`${tracking.sets.length} séries.`}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        <Button
                            className='text-green-400 bg-green-100 w-36 mx-auto mb-1 absolute bottom-0 left-0 right-0'
                            onClick={() => {
                                confirmModalDisclosure.onOpen()
                            }}>
                            Valider la séance
                        </Button>
                    </div>
                )}
            </div>

            <div className={`h-full ${showSelectExercise ? '' : 'hidden'}`}>
                <SearchableExerciseSelect exercises={props.exercises} onSelect={addTracking} />
            </div>

            <ConfirmationModal
                message='Voulez-vous valider la séance ?'
                disclosure={confirmModalDisclosure}
                onConfirm={() => {
                    setEndTraining(true)
                }}
                onCancel={() => {}}
            />
        </div>
    )
}
