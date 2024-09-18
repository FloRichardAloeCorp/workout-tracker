import { Card, CardBody, useDisclosure } from '@nextui-org/react'
import * as React from 'react'
import { Header } from '../components/Header'
import Store from '../store/store'
import { useNavigate } from 'react-router-dom'
import { Dumbbell } from '../assets/dumbbell'
import {
    CalendarIcon,
    ChartBarIcon,
    EyeIcon,
    FireIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/solid'
import { StatCard } from '../components/StatCard'
import { format } from 'date-fns'
import { SelectExerciseStatModal } from '../components/SelectExerciseStatModal'

export interface IHomeProps {}

export function Home(props: IHomeProps) {
    const [profile] = React.useState(() => Store.readProfile())
    const selectExerciseModalDiscosure = useDisclosure()
    const navigate = useNavigate()

    return (
        <div className='App'>
            <Header></Header>
            <h1>Home</h1>
            <Card
                isPressable
                onPress={() => navigate('/new_training')}
                className='w-full bg-[#1D3557] text-white'
                shadow='sm'>
                <CardBody className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center gap-x-3'>
                        <PlusCircleIcon className='size-8' />
                        <p className='text-lg'>Nouvelle séance</p>
                    </div>
                    <Dumbbell color='#FFFFFF' className='size-5' />
                </CardBody>
            </Card>

            <h2 className='text-left'>Statisques</h2>

            <div className='flex flex-row justify-around my-3'>
                <StatCard
                    title='Séances'
                    stat={`${profile.trainings.length.toString()}`}
                    icon={<FireIcon className='size-5' />}
                />
                {profile.trainings.length === 0 ? (
                    <StatCard
                        title='Dernière séance'
                        stat={'N/A'}
                        icon={<CalendarIcon className='size-5' />}
                    />
                ) : (
                    <StatCard
                        title='Dernière séance'
                        stat={format(profile.trainings[profile.trainings.length - 1].date, 'dd/MM')}
                        icon={<CalendarIcon className='size-5' />}
                    />
                )}
            </div>

            <Card
                isPressable
                onPress={() => selectExerciseModalDiscosure.onOpen()}
                className='w-full bg-[#1D3557] text-white'
                shadow='sm'>
                <CardBody className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center gap-x-3'>
                        <EyeIcon className='size-8' />
                        <p className='text-lg'>Voir plus</p>
                    </div>
                    <ChartBarIcon className='size-5'></ChartBarIcon>
                </CardBody>
            </Card>

            <SelectExerciseStatModal disclosure={selectExerciseModalDiscosure} />
        </div>
    )
}
