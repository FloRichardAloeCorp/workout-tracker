import { signOut } from '@firebase/auth'
import { Button, Spacer } from '@nextui-org/react'
import * as React from 'react'
import { auth } from '../firebase'

export interface IMeProps {}

export function Me(props: IMeProps) {
    const logOut = () => {
        signOut(auth)
            .then(() => {
                console.log('logged out')
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className='text-center'>
            <h1>Profil</h1>
            <Spacer y={12} />
            <div className='text-left'>
                <h2>Connecté en tant que:</h2>

                <p>{auth.currentUser?.email}</p>
            </div>

            <Spacer y={8} />

            <Button variant='flat' color='danger' onPress={logOut}>
                Se déconnecter
            </Button>
        </div>
    )
}
