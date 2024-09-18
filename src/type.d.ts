export interface Training {
  date: Date,
  trackings: ExerciseTracking[]
}

export interface ExerciseTracking {
  id: string
  date: Date,
  exerciseId: string
  sets: Set[]
}

export interface Set {
  id: string
  weight: number
  repetitions: number
}

export interface Exercise {
  id: string
  name: string,
}

export interface Profil {
  trainings: Training[]
}

export interface ChartDataPoint {
  value: number
  date: Date
}