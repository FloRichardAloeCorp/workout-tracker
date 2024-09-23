import { getWeek, isSameWeek } from 'date-fns'
import { Profile } from '../../../../type'
import { WeeklyChartDataPoint } from './elements/WeeklyTrainingBarChart.type'

export const getChartDataFromProfile = (profile: Profile): WeeklyChartDataPoint[] => {
    const trainingLenght = profile.trainings.length
    if (trainingLenght === 0) return []

    let dataPoints: WeeklyChartDataPoint[] = []

    let trainingsIndex = trainingLenght - 1

    const today = new Date()

    while (trainingsIndex >= 0) {
        const targetTraining = profile.trainings[trainingsIndex]
        const targetTrainingDate = targetTraining.start_date.toDate()

        // Check if training date is after this week
        if (getWeek(targetTrainingDate) > getWeek(today)) {
            trainingsIndex -= 1
            continue
        }

        // Break if there is no training this week
        if (!isSameWeek(targetTrainingDate, today, { weekStartsOn: 1 })) {
            break
        }

        // add duration if the day is already presents in the datapoints array.
        if (dataPoints.some((point) => point.day === targetTrainingDate.getDay())) {
            const index = dataPoints.findIndex((point) => point.day === targetTrainingDate.getDay())
            dataPoints[index].value += targetTraining.duration_in_secondes
            trainingsIndex -= 1
            continue
        }

        dataPoints.push({
            day: targetTrainingDate.getDay(),
            value: targetTraining.duration_in_secondes,
        })
        trainingsIndex -= 1
    }

    // Setting sunday value to 7 in order to Mon to Sun weeks
    dataPoints = dataPoints.sort((a, b) => {
        if (a.day === 0) {
            return 7 - b.day
        }

        if (b.day === 0) {
            return a.day - 7
        }

        return a.day - b.day
    })
    return dataPoints
}
