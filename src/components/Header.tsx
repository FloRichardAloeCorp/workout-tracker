import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
} from '@nextui-org/react';
import { UserCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
    const navigate = useNavigate();
    return (
        <Navbar className='bg-background'>
            <NavbarBrand onClick={() => navigate('/')}>
                <p>Workout Tracker</p>
            </NavbarBrand>
            <NavbarContent justify='end'>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant='light' isIconOnly>
                            <UserCircleIcon className='size-6' />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem
                            startContent={<PlusCircleIcon className='size-6' />}
                            href='/new_training'
                        >
                            Nouvelle séance
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
