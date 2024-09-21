import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from 'recharts'
import { Tooltip } from '@nextui-org/react'
import { WeeklyChartDataPoint } from './type'
import { formatTrainingDuration } from './duration'

export interface IWeeklyTrainingBarChartsProps {
    chartData: WeeklyChartDataPoint[]
}

export function WeeklyTrainingBarCharts(props: IWeeklyTrainingBarChartsProps) {
    const getDayAbrev = (day: number): string => {
        switch (day) {
            case 1:
                return 'Lun.'
            case 2:
                return 'Mar.'
            case 3:
                return 'Mer.'
            case 4:
                return 'Jeu.'
            case 5:
                return 'Ven.'
            case 6:
                return 'Sam.'
            case 0:
                return 'Dim.'

            default:
                return ''
        }
    }

    return (
        <ResponsiveContainer
            width='100%'
            height='100%'
            minHeight={200}
            className={'overflow-visible'}>
            <BarChart
                data={props.chartData}
                compact
                className='overflow-visible'
                margin={{ top: 20 }}>
                <XAxis
                    dataKey='day'
                    className='text-xs'
                    tickFormatter={getDayAbrev}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip />
                <Bar dataKey='value' radius={6} fill='#44a2c2' maxBarSize={37}>
                    <LabelList
                        dataKey='value'
                        position='top'
                        className='text-xs font-semibold'
                        formatter={formatTrainingDuration}></LabelList>
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}
