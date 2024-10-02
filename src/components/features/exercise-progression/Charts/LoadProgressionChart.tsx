import { ChartDataPoint, ExerciseTracking } from '../../../../type'
import { ProgressionChart } from './elements/ProgressionChart'

export interface ILoadProgressionChartProps {
    trackings: ExerciseTracking[]
}

export function LoadProgressionChart(props: ILoadProgressionChartProps) {
    const computeAvgWeightByTraining = (trackings: ExerciseTracking[]): ChartDataPoint[] => {
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

        return data
    }

    return (
        <ProgressionChart
            YAxisUnit={'Kg'}
            dataSet={computeAvgWeightByTraining(props.trackings)}
            tooltipValueLabel={'Charge'}
        />
    )
}
