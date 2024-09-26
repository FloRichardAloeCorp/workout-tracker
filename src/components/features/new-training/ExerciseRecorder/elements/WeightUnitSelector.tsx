import {
    ButtonsBarItems,
    ButtonsBarSelector,
} from '../../../../shared/ui/ButtonsBarSelector/ButtonsBarSelector'

export interface IWeightUnitSelectorProps {
    onChange: (unit: string) => void
}

export function WeightUnitSelector(props: IWeightUnitSelectorProps) {
    const updateUnit = (unit: string) => {
        props.onChange(unit)
    }

    const items: ButtonsBarItems[] = [
        {
            label: 'Kg',
            value: 'Kg',
            key: 'kg',
        },
        {
            label: 'Lbs',
            value: 'Lbs',
            key: 'lbs',
        },
    ]

    return (
        <ButtonsBarSelector
            baseBackgroundColor='#FEEFC2'
            baseTextColor='#09231B'
            items={items}
            selectedKey='kg'
            onSelect={updateUnit}
        />
    )
}
