import { Set } from '../../../../type'
import { StrongArm } from '../../../../assets/StrongArm'
import { WeightLogo } from '../../../../assets/WeightLogo'
import { InfoCard } from '../../../shared/ui/InfoCard/InfoCard'

export interface ILastTrainingSummaryProps {
    sets: Set[]
}

export function LastTrainingSummary(props: ILastTrainingSummaryProps) {
    const computeTotalLiftedWeight = (sets: Set[]) => {
        let sum = 0
        sets.forEach((set) => {
            sum += set.weight
        })
        return sum
    }

    const computeTotalReps = (sets: Set[]) => {
        let sum = 0
        sets.forEach((set) => {
            sum += set.repetitions
        })
        return sum
    }

    return (
        <div className='flex flex-row justify-around'>
            <InfoCard
                content={`${computeTotalLiftedWeight(props.sets)} Kg`}
                description='Cumul des charges'
                icon={<WeightLogo className='size-9' />}
                color='yellow'
            />
            <InfoCard
                content={`${computeTotalReps(props.sets)} Reps`}
                description='Cumul des répétitions'
                icon={<StrongArm className='size-9' />}
                color='purple'
            />
        </div>
    )
}
