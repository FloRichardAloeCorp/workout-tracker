import * as React from 'react'

import { Exercise, ExerciseTracking, Set } from '../type'
import { Accordion, AccordionItem, Button, DatePicker, Divider, Spacer } from '@nextui-org/react'

import { TrashIcon } from '@heroicons/react/24/outline'
import { getLocalTimeZone, today } from '@internationalized/date'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { Timestamp } from 'firebase/firestore'
import { StopWatch } from '../components/shared/ui/StopWatch/Stopwatch'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/solid'
import { isToday } from 'date-fns'
import { ExerciseRecorder } from '../components/features/new-training/ExerciseRecorder/ExerciseRecorder'
import { InfoCard } from '../components/shared/ui/InfoCard/InfoCard'
import { SearchableExerciseSelect } from '../components/features/select-exercises/SearchableExerciseSelect/SearchableExerciseSelect'
import { ProfileService } from '../services/ProfileService'

export interface INewTrainingProps {
    exercises: Exercise[]
    onValidate: () => void
}

export function NewTraining(props: INewTrainingProps) {
    const [trackings, setTrackings] = React.useState<ExerciseTracking[]>([])
    const [selectedDate, setSelectedDate] = React.useState(today(getLocalTimeZone()))

    const [showSelectExercise, setShowSelectExercise] = React.useState(false)
    const [trainingDuration, setTrainingDuration] = React.useState(0)
    const [endTraining, setEndTraining] = React.useState(false)

    const navigate = useNavigate()
    const setsStore = React.useRef<any[]>([])

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
                        className='text-[#44a2c2] bg-[#E3EBF9]'
                        onClick={() => setShowSelectExercise(true)}>
                        Ajouter
                    </Button>
                </div>

                <Spacer y={8} />
                {trackings.length === 0 ? (
                    <div className='description'>Ajoutez un execice pour commencer.</div>
                ) : (
                    <div className='relative h-[60%] max-h-[60%] min-h-[60%]'>
                        <div className='h-96 overflow-y-auto'>
                            <Accordion variant='splitted' keepContentMounted isCompact>
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
                                        <ExerciseRecorder
                                            trackingId={tracking.exercise_tracking_id}
                                            onChange={updateSets}
                                        />
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        <Button
                            className='text-[#37b88d] bg-[#3fcd9e43] w-36 mx-auto mb-1 absolute bottom-0 left-0 right-0'
                            onClick={() => setEndTraining(true)}>
                            Valider la séance
                        </Button>
                    </div>
                )}
            </div>

            <div className={showSelectExercise ? '' : 'hidden'}>
                <SearchableExerciseSelect exercises={props.exercises} onSelect={addTracking} />
            </div>
        </div>
    )
}
