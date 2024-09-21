import { Card, CardBody, Spacer, useDisclosure } from '@nextui-org/react'
import * as React from 'react'
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
import { SelectExerciseModal } from '../components/select-exercise/SelectExerciseModal'
import { readProfile } from '../api/profile'
import { auth } from '../firebase'
import { Exercise, Profile } from '../type'

export interface IHomeProps {
    exercises: Exercise[]
    OnProfileLoaded: (profile: Profile) => void
}

export function Home(props: IHomeProps) {
    const [profile, setProfile] = React.useState<Profile>()
    const selectExerciseModalDiscosure = useDisclosure()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!auth.currentUser) {
            return
        }

        readProfile(auth.currentUser.uid)
            .then((profile) => {
                setProfile(profile)
                props.OnProfileLoaded(profile)
            })
            .catch((error) => console.log(error))

        console.log(profile)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='App'>
            <h1>Home</h1>
            <Spacer y={12} />

            <div className='flex flex-row justify-between'>
                <StatCard
                    title='Séances'
                    stat={`${
                        profile && profile.trainings && profile.trainings.length > 0
                            ? profile?.trainings.length.toString()
                            : '0'
                    }`}
                    icon={<FireIcon className='size-5' />}
                />
                {profile && profile.trainings && profile.trainings.length > 0 ? (
                    <StatCard
                        title='Dernière séance'
                        stat={format(
                            profile?.trainings[profile?.trainings.length - 1].start_date.toDate() ||
                                '',
                            'dd/MM'
                        )}
                        icon={<CalendarIcon className='size-5' />}
                    />
                ) : (
                    <StatCard
                        title='Dernière séance'
                        stat={'N/A'}
                        icon={<CalendarIcon className='size-5' />}
                    />
                )}
            </div>

            <Spacer y={8} />

            <Card
                isPressable
                onPress={() => navigate('/new_training')}
                className='w-full bg-success text-white'
                shadow='sm'>
                <CardBody className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center gap-x-3'>
                        <PlusCircleIcon className='size-8' />
                        <p className='text-lg'>Nouvelle séance</p>
                    </div>
                    <Dumbbell color='#FFFFFF' className='size-5' />
                </CardBody>
            </Card>

            <Spacer y={8} />

            <h2 className='text-left'>Statisques</h2>

            <Spacer y={8} />

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
            <SelectExerciseModal
                disclosure={selectExerciseModalDiscosure}
                onSelectedExercise={(e: string) => {}}
                exercises={props.exercises}
            />
        </div>
    )
}
