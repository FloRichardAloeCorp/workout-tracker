import { createUserWithEmailAndPassword } from '@firebase/auth'
import { Button, Input, Spacer } from '@nextui-org/react'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { ProfileService } from '../services/ProfileService'

export interface ISignupProps {}

export function Signup(props: ISignupProps) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()

    const onSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password)
            await ProfileService.create(credentials.user.uid)
            navigate('/')
        } catch (error) {
            console.log('sign up error', error)
        }
    }

    return (
        <div className='flex flex-col h-100% justify-center px-8'>
            <Spacer y={12} />
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <img src='/logo.png' alt='logo' className='h-20 w-auto'></img>
                </div>
            </div>
            <Spacer y={16} />
            <h1>Créez votre compte</h1>
            <Spacer y={12} />
            <form onSubmit={onSubmit}>
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
                    Créer mon compte
                </Button>
                <Spacer y={4} />
                <p className='text-xs text-center'>
                    Vous avez déjà un compte?{' '}
                    <Link to='/login' className='text-[#77D7F7] underline'>
                        Connectez-vous.
                    </Link>
                </p>
            </form>
        </div>
    )
}
