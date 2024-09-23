import { Button, Input, Spacer } from '@nextui-org/react'
import * as React from 'react'
import { Link } from 'react-router-dom'

export interface ICredentialsFormProps {
    onSubmit: (email: string, password: string) => void
    ctaText: string
    footerText: string
    footerLinkText: string
    footerLinkDestination: string
}

export function CredentialsForm(props: ICredentialsFormProps) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <form
            onSubmit={(e: any) => {
                e.preventDefault()
                props.onSubmit(email, password)
            }}>
            <Input
                type='email'
                label='Email'
                placeholder='jhon@gmail.com'
                value={email}
                onValueChange={setEmail}></Input>
            <Spacer y={4} />
            <Input
                type='password'
                label='Mot de passe'
                value={password}
                onValueChange={setPassword}></Input>
            <Spacer y={12} />
            <Button color='success' type='submit' className='w-full font-semibold text-white'>
                {props.ctaText}
            </Button>
            <Spacer y={4} />
            <p className='text-xs text-center'>
                {props.footerText}
                <Link to={props.footerLinkDestination} className='text-[#77D7F7] underline ml-1'>
                    {props.footerLinkText}
                </Link>
            </p>
        </form>
    )
}
