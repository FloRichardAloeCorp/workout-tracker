import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { Profile, Training } from "../type"

const profileCollection = 'profiles'


export const ProfileService = {
    create: async (userId: string) => {
        try {
            const profileDocument = doc(db, profileCollection, userId)
            await setDoc(profileDocument, {
                created_at: new Date(),
            })
            console.log('profile created')
        } catch (error) {
            console.log(error)
        }
    },

    addTraining: async (userId: string, training: Training) => {
        try {
            const profileRef = doc(db, profileCollection, userId)
            await updateDoc(profileRef, {
                trainings: arrayUnion(training),
            })
        } catch (error) {
            console.log(error)
        }
    },

    getbyId: async (userId: string): Promise<Profile> => {
        try {
            const profileRef = doc(db, profileCollection, userId)
            const querySnapshot = await getDoc(profileRef)
            if (!querySnapshot.exists()) {
                throw new Error("Profile doesn't exists")
            }

            const profile = querySnapshot.data() as Profile
            profile.trainings = profile.trainings.sort(
                (a, b) => a.start_date.toDate().getTime() - b.start_date.toDate().getTime()
            )
            return profile
        } catch (error) {
            console.log(error)
            throw new Error('invalid profile')
        }
    }
}