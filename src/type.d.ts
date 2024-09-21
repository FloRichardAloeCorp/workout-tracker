import { Timestamp } from "firebase/firestore"

export interface Profile {
  created_at: Timestamp
  trainings: Training[]
}

export interface Training {
  training_id: string
  start_date: Timestamp,
  duration_in_secondes: number,
  trackings: ExerciseTracking[]
}

export interface ExerciseTracking {
  exercise_tracking_id: string
  date: Timestamp,
  exercise_id: string
  sets: Set[]
}

export interface Set {
  set_id: string
  weight: number
  repetitions: number
}

export interface Exercise {
  exercise_id: string
  name: string,
  category: string,
}


export interface ChartDataPoint {
  value: number
  date: Date
}