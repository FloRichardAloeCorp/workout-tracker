import { Button, Card, CardBody, CardHeader, Spacer } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { CalendarIcon, FireIcon } from '@heroicons/react/24/solid'
import { InfoCard } from '../components/shared/ui/InfoCard/InfoCard'
import { format } from 'date-fns'

import { Exercise, Profile } from '../type'
import logo from '../assets/logo.png'

export interface IHomeProps {
    profile: Profile | undefined
    exercises: Exercise[]
}

export function Home(props: IHomeProps) {
    const navigate = useNavigate()

    const trainingsCount = props.profile?.trainings != null ? props.profile.trainings.length : 0
    const lastTrainingDate =
        props.profile?.trainings != null && props.profile?.trainings.length > 0
            ? format(
                  props.profile?.trainings[props.profile?.trainings.length - 1].start_date.toDate(),
                  'dd/MM'
              )
            : 'N/A'

    return (
        <div className='App'>
            <h1>Home</h1>

            <Spacer y={12} />

            <div className='flex flex-col justify-center items-center'>
                <div>
                    <img src={logo} alt='logo' className='h-16 w-auto'></img>
                </div>
            </div>

            <Spacer y={8} />

            <div className='flex flex-row justify-around h-32'>
                <InfoCard
                    content={trainingsCount.toString()}
                    description='Nombre de séances'
                    icon={<FireIcon className='size-9' />}
                    color='yellow'
                />
                <InfoCard
                    content={lastTrainingDate}
                    description='Dernière séance'
                    icon={<CalendarIcon className='size-9' />}
                    color='purple'
                />
            </div>

            <Spacer y={8} />

            <Card>
                <CardHeader className='flex flex-col items-start'>
                    <h2>Nouvelle séance</h2>
                </CardHeader>
                <p className='description text-center'>
                    Commencez à enregistrer une nouvelle séance.
                </p>
                <CardBody className=''>
                    <Button
                        className='text-[#37b88d] bg-[#3fcd9e43]'
                        onClick={() => navigate('/new_training')}>
                        Commencer
                    </Button>
                </CardBody>
            </Card>

            <Spacer y={8} />

            <Card>
                <CardHeader className='flex flex-col items-start'>
                    <h2>Progression</h2>
                </CardHeader>
                <p className='description text-center'>Consultez votre progression.</p>
                <CardBody className=''>
                    <Button
                        className='text-[#44a2c2] bg-[#E3EBF9]'
                        onClick={() => navigate('/stats')}>
                        Consulter
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}
