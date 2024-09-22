import { useNavigate } from 'react-router-dom'
import { Exercise, Profile } from '../type'
import { Button, Card, CardBody, CardHeader, Spacer } from '@nextui-org/react'
import { WeeklyTrainingsCard } from '../components/features/stats/WeeklyTrainingsCard/WeeklyTrainingsCard'

export interface IStatsProps {
    profile: Profile | undefined
    exercises: Exercise[]
}

export function Stats(props: IStatsProps) {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Progression</h1>

            <Spacer y={12} />

            {props.profile && (
                <>
                    <Spacer y={4} />
                    <WeeklyTrainingsCard profile={props.profile} />
                </>
            )}

            <Spacer y={8} />

            <Card>
                <CardHeader className='flex flex-col items-start'>
                    <h2>Progression par exercice</h2>
                </CardHeader>
                <p className='description text-center'>
                    Consultez votre progression en sélectionnant un exercice.
                </p>
                <CardBody className=''>
                    <Button
                        className='text-[#44a2c2] bg-[#E3EBF9]'
                        onClick={() => navigate('/stats/select_exercise')}>
                        Sélectionner
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}
