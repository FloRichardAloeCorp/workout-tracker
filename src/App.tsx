import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import { useNavigate, useHref, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { NewTraining } from './pages/NewTraining'
import { Stats } from './pages/Stats'
import { Helmet } from 'react-helmet-async'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { useEffect, useState } from 'react'
import { Exercise, Profile } from './type'
import { Layout } from './components/layout/Layout'
import { ExerciseProgression } from './pages/ExerciseProgression'
import { SelectExercise } from './pages/SelectExercise'
import { Me } from './pages/me'
import { auth } from './firebase'

import { ExercisesService } from './services/ExercisesService'
import { ProfileService } from './services/ProfileService'

function App() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState<Profile>()
    const [exercises, setExcercises] = useState<Exercise[]>([])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const exercises = await ExercisesService.getAll()
                    setExcercises(exercises)

                    const profile = await ProfileService.getbyId(user.uid)
                    setProfile(profile)
                } catch (error) {
                    console.log(error)
                }
            }
        })

        // Cleanup the subscription on component unmount
        return () => unsubscribe()
    }, [])

    const reloadProfile = async () => {
        if (auth.currentUser) {
            const profile = await ProfileService.getbyId(auth.currentUser.uid)
            setProfile(profile)
        }
    }

    return (
        <NextUIProvider navigate={navigate} useHref={useHref}>
            <Helmet>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, maximum-scale=1'
                />
            </Helmet>

            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />

                <Route path='/' element={<Layout />}>
                    <Route index element={<Home exercises={exercises} profile={profile} />} />
                    <Route path='/me' element={<Me />} />

                    <Route
                        path='/new_training'
                        element={<NewTraining exercises={exercises} onValidate={reloadProfile} />}
                    />
                    <Route
                        path='/new_training/select_exercise'
                        element={<SelectExercise to='/new_training' exercises={exercises} />}
                    />

                    <Route
                        path='/stats'
                        element={<Stats profile={profile} exercises={exercises} />}
                    />
                    <Route
                        path='/stats/select_exercise'
                        element={<SelectExercise to='/stats/exercise' exercises={exercises} />}
                    />
                    <Route
                        path='/stats/exercise'
                        element={<ExerciseProgression profile={profile} exercises={exercises} />}
                    />
                </Route>
            </Routes>
        </NextUIProvider>
    )
}

export default App
