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
import { Layout } from './components/layout/layout'
import { fetchExercises } from './api/exercises'
import { ExerciseProgression } from './pages/ExerciseProgression'

function App() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState<Profile>()
    const [exercises, setExcercises] = useState<Exercise[]>([])

    useEffect(() => {
        fetchExercises().then((exercises) => {
            setExcercises(exercises)
        })
    }, [])

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
                    <Route
                        index
                        element={<Home exercises={exercises} OnProfileLoaded={setProfile} />}
                    />
                    <Route path='/new_training' element={<NewTraining exercises={exercises} />} />
                    <Route
                        path='/stats'
                        element={<Stats profile={profile} exercises={exercises} />}
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
