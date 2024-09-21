import { ChartBarIcon, HomeIcon, PlusCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import { NavBarButton } from '../NavBarButton'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ProtectedRoute } from '../../auth/ProtectRoute'
import { Spacer } from '@nextui-org/react'

export const Layout = () => {
    const [activeButton, setActiveButton] = useState<string>('home')

    const handleClick = (buttonName: string) => {
        setActiveButton(buttonName)
    }

    return (
        <div className='min-h-full w-full max-h-full flex flex-col justify-between'>
            <div className='flex flex-col flex-grow min-w-full px-8 '>
                <Spacer y={4} />
                <ProtectedRoute>{<Outlet />}</ProtectedRoute>
            </div>

            <div className='flex flex-row w-full justify-evenly py-2 sticky border-t-1'>
                <NavBarButton
                    current_button={activeButton}
                    name='stats'
                    label='Progression'
                    onClick={handleClick}
                    icon={<ChartBarIcon />}
                    to='/stats'
                />
                <NavBarButton
                    current_button={activeButton}
                    name='home'
                    label='Accueil'
                    onClick={handleClick}
                    icon={<HomeIcon />}
                    to='/'
                />
                <NavBarButton
                    current_button={activeButton}
                    name='new_training'
                    onClick={handleClick}
                    label="S'entrainer"
                    icon={<PlusCircleIcon />}
                    to='/new_training'
                />
                <NavBarButton
                    current_button={activeButton}
                    name='profile'
                    label='Moi'
                    onClick={handleClick}
                    icon={<UserIcon />}
                    to='/me'
                />
            </div>
        </div>
    )
}
