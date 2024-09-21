import { Button, Input, Spacer } from '@nextui-org/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import * as React from 'react'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export interface ILoginProps {}

export function Login(props: ILoginProps) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()

    const onLogin = async (e: any) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col h-100% justify-center'>
            <Spacer y={12} />
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <img src={logo} alt='logo' className='h-20 w-auto'></img>
                </div>
            </div>
            <Spacer y={16} />
            <h1>Bienvenue!</h1>
            <h2 className='font-normal text-center'>Connectez-vous pour accèder à l'application</h2>
            <Spacer y={12} />
            <form onSubmit={onLogin}>
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
                    Se connecter
                </Button>
                <Spacer y={4} />
                <p className='text-xs text-center'>
                    Vous n'avez pas de compte?{' '}
                    <Link to='/signup' className='text-[#77D7F7] underline'>
                        Créez en un.
                    </Link>
                </p>
            </form>
        </div>
    )
}
