import * as React from 'react'

export interface IStopWatchProps {
    isRunning: boolean
    onStop: (duration: number) => void
}

export function StopWatch(props: IStopWatchProps) {
    const [time, setTime] = React.useState(0)
    const hasStopped = React.useRef(false)

    React.useEffect(() => {
        let intervalId: NodeJS.Timeout

        if (props.isRunning) {
            intervalId = setInterval(() => setTime((previous) => previous + 1), 1000)
        } else {
            if (!hasStopped.current) {
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
        <div>
            <p className='font-medium'>
                {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </p>
        </div>
    )
}
