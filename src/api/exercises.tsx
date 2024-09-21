import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { Exercise } from '../type'
import { db } from '../firebase'

export const fetchExercises = async (): Promise<Exercise[]> => {
    try {
        const exercisesCollection = collection(db, 'exercises')
        const querySnapshot = await getDocs(exercisesCollection)

        const exercises = querySnapshot.docs.map(
            (doc): Exercise => ({
                exercise_id: doc.id,
                name: doc.get('name'),
                category: doc.get('category'),
            })
        )

        return exercises
    } catch (error) {
        console.log("can't fetch exercise", error)
        return []
    }
}

export const getExercisebyId = async (exerciseId: string): Promise<Exercise | undefined> => {
    try {
        const exerciseDocRef = doc(db, 'exercises', exerciseId)
        const exerciseDoc = await getDoc(exerciseDocRef)
        if (!exerciseDoc.exists()) {
            throw new Error('unknown exercise id')
        }

        return {
            exercise_id: exerciseDoc.id,
            name: exerciseDoc.get('name'),
            category: exerciseDoc.get('category'),
        }
    } catch (error) {
        console.log(error)
        return undefined
    }
}

// const addData = async () => {
//     try {
//         for (const ex of Exo) {
//             await setDoc(doc(db, 'exercises', ex.UUID), {
//                 name: ex.Name,
//                 category: ex.Category,
//             })
//         }
//         console.log('success')
//     } catch (error) {
//         console.log(error)
//     }
// }
