import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from 'recharts'
import { Tooltip } from '@nextui-org/react'
import { WeeklyChartDataPoint } from './WeeklyTrainingBarChart.type'
import { dayToString, formatTrainingDuration } from './WeeklyTrainingBarChart.utils'

export interface IWeeklyTrainingBarChartsProps {
    chartData: WeeklyChartDataPoint[]
}

export function WeeklyTrainingBarCharts(props: IWeeklyTrainingBarChartsProps) {
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
                    tickFormatter={dayToString}
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
