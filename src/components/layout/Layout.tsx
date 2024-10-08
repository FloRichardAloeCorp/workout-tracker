import { ChartBarIcon, HomeIcon, PlusCircleIcon, UserIcon } from '@heroicons/react/24/solid'
import { Spacer } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ProtectedRoute } from '../features/auth/ProtectedRoute/ProtectRoute'
import { NavBarButton } from './NavBarButton'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './Layout.style.css'

export const Layout = () => {
    const [activeButton, setActiveButton] = useState<string>('home')

    const [inProp, setInProp] = useState(true)

    const nodeRef = useRef(null)

    const location = useLocation()

    const handleClick = (buttonName: string) => {
        setActiveButton(buttonName)
    }

    useEffect(() => {
        if (location.pathname === '/') {
            setActiveButton('home')
            return
        }

        if (location.pathname.includes('new_training')) {
            setActiveButton('new_training')
            return
        }

        if (location.pathname.includes('stats')) {
            setActiveButton('stats')
            return
        }

        if (location.pathname.includes('me')) {
            setActiveButton('profile')
            return
        }

        console.log(location.pathname)
    }, [location])

    return (
        <div className='relative min-h-full max-h-full h-full w-full sm:w-[50%] flex flex-col justify-between mx-auto'>
            <SwitchTransition>
                <CSSTransition
                    ref={nodeRef}
                    key={location.pathname}
                    classNames='fade'
                    timeout={200}>
                    <div
                        className='relative flex flex-col flex-grow min-w-full max-h-[89%] h-[89%]  px-8'
                        ref={nodeRef}>
                        <Spacer y={4} />

                        <ProtectedRoute>{<Outlet />}</ProtectedRoute>
                    </div>
                </CSSTransition>
            </SwitchTransition>

            <div className='flex flex-row w-full justify-evenly py-2 pb-6 sticky border-t-1 bg-background border-default-200'>
                <NavBarButton
                    current_button={activeButton}
                    name='stats'
                    label='Progression'
                    onClick={handleClick}
                    icon={<ChartBarIcon className='size-8' />}
                    to='/stats'
                />
                <NavBarButton
                    current_button={activeButton}
                    name='home'
                    label='Accueil'
                    onClick={handleClick}
                    icon={<HomeIcon className='size-8' />}
                    to='/'
                />
                <NavBarButton
                    current_button={activeButton}
                    name='new_training'
                    onClick={handleClick}
                    label="S'entrainer"
                    icon={<PlusCircleIcon className='size-8' />}
                    to='/new_training'
                />
                <NavBarButton
                    current_button={activeButton}
                    name='profile'
                    label='Moi'
                    onClick={handleClick}
                    icon={<UserIcon className='size-8' />}
                    to='/me'
                />
            </div>
        </div>
    )
}
