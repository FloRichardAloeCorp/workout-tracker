import { Card, CardHeader, CardBody } from '@nextui-org/react'
import * as React from 'react'
import { WeeklyTrainingBarCharts } from './WeeklyTrainingBarChart'
import { Profile } from '../../type'
import { isSameWeek } from 'date-fns'
import { WeeklyChartDataPoint } from './type'
import { formatTrainingDuration } from './duration'

export interface IWeeklyTrainingsProps {
    profile: Profile
}

export function WeeklyTrainings(props: IWeeklyTrainingsProps) {
    const [chartData, setChartData] = React.useState<WeeklyChartDataPoint[]>([])

    React.useEffect(() => {
        setChartData(() => {
            const trainingLenght = props.profile.trainings.length
            if (trainingLenght === 0) return []

            let dataPoints: WeeklyChartDataPoint[] = []
            const lastTraining = props.profile.trainings[trainingLenght - 1]

            let trainingsIndex = trainingLenght - 1

            while (trainingsIndex >= 0) {
                const targetTraining = props.profile.trainings[trainingsIndex]

                if (
                    !isSameWeek(
                        targetTraining.start_date.toDate(),
                        lastTraining.start_date.toDate(),
                        { weekStartsOn: 1 }
                    )
                ) {
                    break
                }

                // add duration if the day is already presents in the datapoints array.
                if (
                    dataPoints.some(
                        (point) => point.day === targetTraining.start_date.toDate().getDay()
                    )
                ) {
                    const index = dataPoints.findIndex(
                        (point) => point.day === targetTraining.start_date.toDate().getDay()
                    )
                    dataPoints[index].value += targetTraining.duration_in_secondes
                    trainingsIndex -= 1
                    continue
                }

                dataPoints.push({
                    day: targetTraining.start_date.toDate().getDay(),
                    value: targetTraining.duration_in_secondes,
                })
                trainingsIndex -= 1
            }

            // Setting sunday value to 7 in order to Mon to Sun weeks
            dataPoints = dataPoints.sort((a, b) => {
                if (a.day === 0) {
                    return 7 - b.day
                }

                if (b.day === 0) {
                    return a.day - 7
                }

                return a.day - b.day
            })
            return dataPoints
        })
    }, [props.profile])

    const trainingsDurationSum = formatTrainingDuration(
        chartData.reduce((acc, training) => (acc += training.value), 0)
    )

    return (
        <Card>
            <CardHeader className='flex flex-col items-start'>
                <h2>Séances de la semaine</h2>
                <p className='description'>Heures de sport: {trainingsDurationSum}</p>
            </CardHeader>
            <CardBody>
                <WeeklyTrainingBarCharts chartData={chartData} />
            </CardBody>
        </Card>
    )
}
