import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import * as React from 'react'

export interface IStopWatchProps {
    isRunning: boolean
    onStop: (duration: number) => void
}

export function StopWatch(props: IStopWatchProps) {
    const [time, setTime] = React.useState(0)
    const hasStopped = React.useRef(false)

    const reset = () => {
        localStorage.removeItem('stop_watch_started')
        setTime(0)
    }

    React.useEffect(() => {
        let intervalId: NodeJS.Timeout

        if (props.isRunning) {
            const rawStartedAt = localStorage.getItem('stop_watch_started')
            if (rawStartedAt) {
                const startedAt = new Date(rawStartedAt)
                const durationSinceStart = Math.floor(
                    (new Date().getTime() - startedAt.getTime()) / 1000
                )
                setTime(durationSinceStart)
            } else {
                localStorage.setItem('stop_watch_started', new Date().toISOString())
            }

            intervalId = setInterval(() => setTime((previous) => previous + 1), 1000)
        } else {
            if (!hasStopped.current) {
                localStorage.removeItem('stop_watch_started')
                hasStopped.current = true
                props.onStop(time)
            }
        }

        return () => clearInterval(intervalId)
    }, [props.isRunning, time, props])

    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60

    return (
        <div className='w-full flex flex-row items-center justify-end'>
            <p className='font-medium'>
                {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </p>
            <Button variant='light' isIconOnly size='sm' onClick={() => reset()}>
                <ArrowPathIcon className='size-3' />
            </Button>
        </div>
    )
}
