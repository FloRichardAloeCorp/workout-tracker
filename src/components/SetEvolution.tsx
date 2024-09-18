import * as React from 'react';
import { Set } from '../type';
import { ComparisonCard } from './ComparisonCard';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

export interface ISetEvolutionProps {
    baseSets: Set[];
    newSets: Set[];
}

type Column = {
    name: string;
    key: string;
};

type ComparisonData = {
    baseValue: number;
    newValue: number;
};

type Row = {
    id: string;
    unit: string;
    data: {
        [key: string]: ComparisonData;
    };
};

export function SetEvolution(props: ISetEvolutionProps) {
    const [rows, setRows] = React.useState<Row[]>([]);
    const [columns, setColumns] = React.useState<Column[]>([]);

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
        ];

        const columns: Column[] = [
            {
                name: 'Type',
                key: 'type',
            },
        ];

        props.newSets.forEach((set, i) => {
            let key = `set_${i}`;
            columns.push({
                name: `Série ${i + 1}`,
                key: key,
            });

            let weightBaseSet = 0;
            if (props.baseSets[i] != null) {
                weightBaseSet = props.baseSets[i].weight;
            }

            rows[0].data[key] = {
                newValue: set.weight,
                baseValue: weightBaseSet,
            };

            let repetitionBaseSet = 0;
            if (props.baseSets[i] != null) {
                repetitionBaseSet = props.baseSets[i].repetitions;
            }

            rows[1].data[key] = {
                newValue: set.repetitions,
                baseValue: repetitionBaseSet,
            };
        });

        setColumns(columns);
        setRows(rows);
    }, [props.baseSets, props.newSets]);

    return (
        <div className='my-3'>
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
                                        return <TableCell>{item.id}</TableCell>;
                                    } else {
                                        return (
                                            <TableCell>
                                                <ComparisonCard
                                                    baseValue={item.data[columnKey].baseValue}
                                                    newValue={item.data[columnKey].newValue}
                                                    unit={item.unit}
                                                />
                                            </TableCell>
                                        );
                                    }
                                }}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            ) : null}
        </div>
    );
}
