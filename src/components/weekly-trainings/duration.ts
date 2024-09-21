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