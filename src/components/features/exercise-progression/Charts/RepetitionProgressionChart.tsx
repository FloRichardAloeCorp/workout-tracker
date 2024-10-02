import { ChartDataPoint, ExerciseTracking } from '../../../../type'
import { ProgressionChart } from './elements/ProgressionChart'

export interface IRepetitionProgressionChartProps {
    trackings: ExerciseTracking[]
}

export function RepetitionProgressionChart(props: IRepetitionProgressionChartProps) {
    const computeAvgRepsByTraining = (trackings: ExerciseTracking[]): ChartDataPoint[] => {
        const data: ChartDataPoint[] = []
        trackings.forEach((tracking) => {
            let sum = 0
            let count = 0
            tracking.sets.forEach((set) => {
                sum += set.repetitions
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

        return data
    }

    return (
        <ProgressionChart
            YAxisUnit={'Reps'}
            dataSet={computeAvgRepsByTraining(props.trackings)}
            tooltipValueLabel={'Reps'}
        />
    )
}
