import { Card, CardHeader, CardBody } from '@nextui-org/react'
import * as React from 'react'
import { WeeklyTrainingBarCharts } from './elements/WeeklyTrainingBarChart'
import { Profile } from '../../../../type'
import { WeeklyChartDataPoint } from './elements/WeeklyTrainingBarChart.type'
import { formatTrainingDuration } from './elements/WeeklyTrainingBarChart.utils'
import { getChartDataFromProfile } from './WeeklyTrainingsCard.utils'

export interface IWeeklyTrainingsCardProps {
    profile: Profile
}

export function WeeklyTrainingsCard(props: IWeeklyTrainingsCardProps) {
    const [chartData, setChartData] = React.useState<WeeklyChartDataPoint[]>([])

    React.useEffect(() => {
        setChartData(() => getChartDataFromProfile(props.profile))
    }, [props.profile])

    const trainingsDurationSum = formatTrainingDuration(
        chartData.reduce((acc, training) => (acc += training.value), 0)
    )

    return (
        <Card>
            <CardHeader className='flex flex-col items-start'>
                <h2>Séances de la semaine</h2>
                <p className='description'>Heures de sport : {trainingsDurationSum}</p>
            </CardHeader>
            <CardBody>
                <WeeklyTrainingBarCharts chartData={chartData} />
            </CardBody>
        </Card>
    )
}
