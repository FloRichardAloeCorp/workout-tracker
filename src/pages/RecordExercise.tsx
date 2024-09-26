import * as React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ExerciseRecorder } from '../components/features/new-training/ExerciseRecorder/ExerciseRecorder'
import { Button, Spacer } from '@nextui-org/react'
import { useTrackingsContext } from '../components/features/new-training/TrackingsContext/TrackingsContext'
import { Set } from '../type'
import { GoBackHeader } from '../components/shared/headers/GoBackHeader/GoBackHeader'

export function RecordExercise() {
    const { trackings, setTrackings } = useTrackingsContext()

    const [trackingId, setTrackingId] = React.useState('')
    const [sets, setSets] = React.useState<Set[]>([])

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()

    const validateSets = () => {
        setTrackings(
            trackings.map((tracking) => {
                return tracking.exercise_tracking_id === trackingId
                    ? { ...tracking, sets: sets }
                    : tracking
            })
        )
        navigate('/new_training')
    }

    React.useEffect(() => {
        const id = searchParams.get('tracking_id')
        if (!id) {
            navigate('/new_training')
            return
        }

        setTrackingId(id)
        setSets(location.state.sets)
    }, [searchParams, trackingId, navigate, location.state.sets])

    return (
        <div className='relative h-full text-center flex flex-col justify-between'>
            <GoBackHeader title='Séries' />

            <Spacer y={12} />

            <ExerciseRecorder sets={sets} onChange={setSets} />

            <Button className='text-[#37b88d] bg-[#3fcd9e43]' onClick={validateSets}>
                Valider les séries
            </Button>
        </div>
    )
}
