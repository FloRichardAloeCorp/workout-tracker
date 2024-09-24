import { createUserWithEmailAndPassword } from '@firebase/auth'
import { Spacer } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { ProfileService } from '../services/ProfileService'
import { CredentialsForm } from '../components/features/auth/CredentialsForm/CredentialsForm'

export interface ISignupProps {}

export function Signup(props: ISignupProps) {
    const navigate = useNavigate()

    const signup = async (email: string, password: string) => {
        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password)
            await ProfileService.create(credentials.user.uid)
            navigate('/')
        } catch (error) {
            console.log('sign up error', error)
        }
    }

    return (
        <div className='w-full sm:w-[35%] mx-auto flex flex-col h-100% justify-center px-8'>
            <Spacer y={12} />

            <div className='flex flex-col justify-center items-center'>
                <div>
                    <img src='/logo.png' alt='logo' className='h-20 w-auto'></img>
                </div>
            </div>

            <Spacer y={16} />

            <h1>Créez votre compte</h1>

            <Spacer y={12} />

            <CredentialsForm
                onSubmit={signup}
                ctaText='Créer mon compte'
                footerText='Vous avez déjà un compte?'
                footerLinkText='Connectez-vous.'
                footerLinkDestination='/login'
            />
        </div>
    )
}
