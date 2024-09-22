export type Column = {
    name: string
    key: string
}

export type ComparisonData = {
    baseValue: number
    newValue: number
}

export type Row = {
    id: string
    unit: string
    data: {
        [key: string]: ComparisonData
    }
}
