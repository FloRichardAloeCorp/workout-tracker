import { ExerciseTracking, Profil, Training } from '../type'

const LOCAL_STORAGE_PROFILE_KEY = 'workout_tracker_user_profile'

const Store = (() => {
    const readProfile = (): Profil => {
        const rawProfile = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY)
        if (!rawProfile) {
            return {
                trainings: [],
            }
        }

        return JSON.parse(rawProfile) as Profil
    }

    const findExcersiceTrackings = (exerciseId: string): ExerciseTracking[] => {
        const profile = readProfile()
        const trackings: ExerciseTracking[] = []
        profile.trainings.forEach((training) => {
            const matchingTrackings = training.trackings.find(
                (tracking) => tracking.exerciseId === exerciseId
            )
            if (matchingTrackings) {
                trackings.push(matchingTrackings)
            }
        })

        return trackings
    }

    const addTraining = (training: Training) => {
        const profile = readProfile()
        if (profile) {
            profile.trainings.push(training)
            writeProfile(profile)
        }
    }

    const writeProfile = (profile: Profil) => {
        profile.trainings = profile.trainings.map((training) => ({
            ...training,
            date: new Date(training.date),
        }))

        profile.trainings = profile.trainings.sort(
            (t1, t2) => t1.date.getTime() - t2.date.getTime()
        )

        localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(profile))
    }

    return {
        readProfile,
        findExcersiceTrackings,
        addTraining,
        writeProfile,
    }
})()

export default Store
