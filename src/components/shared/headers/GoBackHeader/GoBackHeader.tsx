import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export interface IGoBackHeaderProps {
    title: string
}

export function GoBackHeader(props: IGoBackHeaderProps) {
    const navigate = useNavigate()

    return (
        <div className='grid grid-cols-6'>
            <Button
                variant='light'
                isIconOnly
                className='col-span-1 h-7 '
                onClick={() => navigate(-1)}>
                <ArrowLongLeftIcon className='w-9 h-7 font-bold' />
            </Button>
            <h1 className='col-span-4 text-center'>{props.title}</h1>
            <div className='col-span-1'></div>
        </div>
    )
}
