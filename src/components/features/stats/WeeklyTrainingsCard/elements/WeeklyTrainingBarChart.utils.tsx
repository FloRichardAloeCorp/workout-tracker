export const formatTrainingDuration = (durationInSecondes: number): string => {
    if (durationInSecondes <= 60) {
        return `${durationInSecondes.toString().padStart(2, '0')}s`
    }

    if (durationInSecondes <= 3600) {
        return `${Math.floor((durationInSecondes % 3600) / 60)
            .toString()
            .padStart(2, '0')}m`
    }

    if (durationInSecondes >= 3600) {
        return `${Math.floor(durationInSecondes / 3600)
            .toString()
            .padStart(2, '0')}h${Math.floor((durationInSecondes % 3600) / 60)
            .toString()
            .padStart(2, '0')}`
    }

    return ''
}

export const dayToString = (day: number): string => {
    switch (day) {
        case 1:
            return 'Lun.'
        case 2:
            return 'Mar.'
        case 3:
            return 'Mer.'
        case 4:
            return 'Jeu.'
        case 5:
            return 'Ven.'
        case 6:
            return 'Sam.'
        case 0:
            return 'Dim.'

        default:
            return ''
    }
}
