import { format } from 'date-fns'

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
import { ChartDataPoint } from '../../../../../type'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

export interface IProgressionChartProps {
    YAxisUnit: string
    dataSet: ChartDataPoint[]
    tooltipValueLabel: string
}

export function ProgressionChart(props: IProgressionChartProps) {
    const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length && payload[0].value) {
            return (
                <div className='bg-white border p-2 text-sm'>
                    <p className='font-semibold'>{format(label, 'dd/MM/yyyy')}</p>
                    <p className='label'>{`${props.tooltipValueLabel} : ${Math.round(
                        payload[0].value as number
                    )}${props.YAxisUnit}`}</p>
                </div>
            )
        }

        return null
    }

    const minYValue = props.dataSet.reduce((min, current) => {
        return current.value < min.value ? current : min
    }, props.dataSet[0])

    const maxYValue = props.dataSet.reduce((max, current) => {
        return current.value > max.value ? current : max
    }, props.dataSet[0])

    const roundedMinYValue = Math.round(minYValue != null ? minYValue.value : 0)
    const roundedMaxYValue = Math.round(maxYValue != null ? maxYValue.value : 100)

    return (
        <ResponsiveContainer width='100%' height='100%' minHeight={120} maxHeight={200}>
            <LineChart data={props.dataSet} margin={{ top: 20, right: 5, bottom: 5 }}>
                <CartesianGrid horizontal={false} />

                <Line type='monotone' dataKey='value' stroke='#8884d8' />
                <YAxis
                    width={30}
                    label={{ value: props.YAxisUnit, position: 'center' }}
                    className='text-xs'
                    interval={'preserveStartEnd'}
                    ticks={[roundedMinYValue, roundedMaxYValue]}
                    domain={[roundedMinYValue, roundedMaxYValue]}
                    tickLine={false}
                    axisLine={false}
                />
                <XAxis dataKey={'date'} hide />
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
        </ResponsiveContainer>
    )
}
