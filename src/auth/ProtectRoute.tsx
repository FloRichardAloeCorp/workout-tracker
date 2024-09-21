import { useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { auth } from '../firebase'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe() // Nettoyage lors du démontage
    }, [])

    if (loading) {
        return <div>Chargement...</div>
    }

    if (!user) {
        return <Navigate to='/login' />
    }

    return <>{props.children}</>
}
