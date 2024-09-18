import { Exercise } from '../type'

const exercises = [
    {
        id: '1',
        name: 'Développé couché',
    },
    {
        id: '2',
        name: 'Tirage vertical',
    },
    {
        id: '3',
        name: 'Squat',
    },
    {
        id: '4',
        name: 'Curl haltères',
    },
]

export const fetchExercises = async (): Promise<Exercise[]> => {
    return exercises
}

export const getExercisebyId = async (exerciseId: string): Promise<Exercise> => {
    const exo = exercises.find((exercise) => exercise.id === exerciseId)
    if (!exo) {
        throw new Error('unknown exercise id')
    }

    return exo
}
