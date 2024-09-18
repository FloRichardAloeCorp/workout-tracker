import { format } from 'date-fns'
import * as React from 'react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    TooltipProps,
} from 'recharts'
import { ChartDataPoint } from '../type'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

export interface IProgressChartProps {
    YAxisUnit: string
    dataSet: ChartDataPoint[]
}

export function ProgressChart(props: IProgressChartProps) {
    const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length && payload[0].value) {
            return (
                <div className='bg-white border p-2 text-sm'>
                    <p className='font-semibold'>{format(label, 'dd/MM/yyyy')}</p>
                    <p className='label'>{`Charge : ${payload[0].value}Kg`}</p>
                </div>
            )
        }

        return null
    }

    return (
        <ResponsiveContainer width='100%' height='100%' minHeight={200}>
            <LineChart data={props.dataSet}>
                <Line type='monotone' dataKey='value' stroke='#8884d8' />
                <CartesianGrid stroke='#ccc' />
                <XAxis
                    dataKey='date'
                    tickFormatter={(date: Date) => format(date, 'dd/MM/yyyy')}
                    height={57}
                    angle={-45}
                    textAnchor='end'
                    className='text-xs'
                />
                <YAxis width={45} unit={props.YAxisUnit} className='text-xs' />
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
        </ResponsiveContainer>
    )
}
