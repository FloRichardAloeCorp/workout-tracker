import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
} from '@nextui-org/react'
import {
    UserCircleIcon,
    PlusCircleIcon,
    UserMinusIcon,
    HomeIcon,
    ChartBarIcon,
    UserIcon,
} from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

import logo from '../assets/logo.png'
import { getAuth, signOut } from 'firebase/auth'
import { NavBarButton } from './NavBarButton'
import { useState } from 'react'

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
    const navigate = useNavigate()
    const auth = getAuth()
    const [activeButton, setActiveButton] = useState<string>('home')

    const btnSelectedClass = 'text-success'
    const btnInactiveClass = 'text-default'

    const handleClick = (buttonName: string) => {
        setActiveButton(buttonName)
    }

    const disconnect = () => {
        console.log('user', auth.currentUser)
        signOut(auth)
            .then(() => {
                console.log('logged out')
            })
            .catch((error) => console.log(error))
    }

    return (
        <Navbar className=''>
            <NavbarContent justify='center'>
                {/* <NavBarButton
                    current_button={activeButton}
                    name='stats'
                    onClick={handleClick}
                    icon={<ChartBarIcon />}
                />
                <NavBarButton
                    current_button={activeButton}
                    name='home'
                    onClick={handleClick}
                    icon={<HomeIcon />}
                />
                <NavBarButton
                    current_button={activeButton}
                    name='new_training'
                    onClick={handleClick}
                    icon={<PlusCircleIcon />}
                />
                <NavBarButton
                    current_button={activeButton}
                    name='profile'
                    onClick={handleClick}
                    icon={<UserIcon />}
                /> */}
            </NavbarContent>
        </Navbar>
    )
}
