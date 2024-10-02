import * as React from 'react'
import { Set } from '../../../../type'
import { ComparisonCard } from './elements/ComparisonCard'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Row, Column } from './SetEvolutionTable.type'

export interface ISetEvolutionTableProps {
    baseSets: Set[]
    newSets: Set[]
}

export function SetEvolutionTable(props: ISetEvolutionTableProps) {
    const [rows, setRows] = React.useState<Row[]>([])
    const [columns, setColumns] = React.useState<Column[]>([])

    React.useEffect(() => {
        const rows: Row[] = [
            {
                id: 'Poids',
                unit: 'kg',
                data: {},
            },
            {
                id: 'Reps',
                unit: 'reps',
                data: {},
            },
        ]

        const columns: Column[] = [
            {
                name: 'Type',
                key: 'type',
            },
        ]

        let setsCount = props.newSets.length
        if (props.baseSets.length > setsCount) {
            setsCount = props.baseSets.length
        }

        for (let i = 0; i < setsCount; i++) {
            let key = `set_${i}`
            columns.push({
                name: `Série ${i + 1}`,
                key: key,
            })

            let baseSetWeight = 0
            if (props.baseSets[i] != null) {
                baseSetWeight = props.baseSets[i].weight
            }

            let newSetWeight = 0
            if (props.newSets[i] != null) {
                newSetWeight = props.newSets[i].weight
            }

            rows[0].data[key] = {
                baseValue: baseSetWeight,
                newValue: newSetWeight,
            }

            let baseSetReps = 0
            if (props.baseSets[i] != null) {
                baseSetReps = props.baseSets[i].repetitions
            }

            let newSetReps = 0
            if (props.newSets[i] != null) {
                newSetReps = props.newSets[i].repetitions
            }

            rows[1].data[key] = {
                baseValue: baseSetReps,
                newValue: newSetReps,
            }
        }

        setColumns(columns)
        setRows(rows)
    }, [props.baseSets, props.newSets])

    return (
        <div className='px-1'>
            {columns.length > 0 ? (
                <Table>
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.key} align='center'>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => {
                                    if (columnKey === 'type') {
                                        return <TableCell>{item.id}</TableCell>
                                    } else {
                                        return (
                                            <TableCell>
                                                <ComparisonCard
                                                    baseValue={item.data[columnKey].baseValue}
                                                    newValue={item.data[columnKey].newValue}
                                                />
                                            </TableCell>
                                        )
                                    }
                                }}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            ) : null}
        </div>
    )
}
