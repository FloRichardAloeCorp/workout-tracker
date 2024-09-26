import { createContext, ReactNode, useContext, useState } from 'react'
import { ExerciseTracking } from '../../../../type'

export interface ITrackingsContext {
    trackings: ExerciseTracking[]
    setTrackings: React.Dispatch<React.SetStateAction<ExerciseTracking[]>>
}

const TrackingsContext = createContext<ITrackingsContext>({
    trackings: [],
    setTrackings: () => {},
})

export const TrackingsContextProvider = ({ children }: { children: ReactNode }) => {
    const [trackings, setTrackings] = useState<ExerciseTracking[]>([])

    return (
        <TrackingsContext.Provider value={{ trackings, setTrackings }}>
            {children}
        </TrackingsContext.Provider>
    )
}

export const useTrackingsContext = () => useContext(TrackingsContext)
