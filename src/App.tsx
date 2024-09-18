import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import { useNavigate, useHref, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { NewTraining } from './pages/NewTraining'
import { Stats } from './pages/Stats'
import { Helmet } from 'react-helmet-async'

function App() {
    const navigate = useNavigate()

    return (
        <NextUIProvider navigate={navigate} useHref={useHref}>
            <Helmet>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, maximum-scale=1'
                />
            </Helmet>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/new_training' element={<NewTraining />} />
                <Route path='/stats' element={<Stats />} />
            </Routes>
        </NextUIProvider>
    )
}

export default App
