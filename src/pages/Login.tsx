import { Spacer } from '@nextui-org/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import * as React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { CredentialsForm } from '../components/features/auth/CredentialsForm/CredentialsForm'

export interface ILoginProps {}

export function Login(props: ILoginProps) {
    const navigate = useNavigate()

    const login = async (email: string, password: string) => {
        console.log(email, password)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
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

            <h1>Bienvenue!</h1>
            <h2 className='font-normal text-center'>Connectez-vous pour accèder à l'application</h2>

            <Spacer y={12} />

            <CredentialsForm
                onSubmit={login}
                ctaText='Se connecter'
                footerText="Vous n'avez pas de compte?"
                footerLinkText='Créez en un.'
                footerLinkDestination='/signup'
            />
        </div>
    )
}
