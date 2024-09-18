import * as React from 'react'

import type { UseDisclosureReturn } from '@nextui-org/use-disclosure'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Autocomplete,
    AutocompleteItem,
} from '@nextui-org/react'
import { Exercise } from '../type'
import { fetchExercises } from '../api/exercises'
import { useNavigate } from 'react-router-dom'

export interface ISelectExerciseStatModalProps {
    disclosure: UseDisclosureReturn
}

export function SelectExerciseStatModal(props: ISelectExerciseStatModalProps) {
    const { isOpen, onOpenChange } = props.disclosure
    const [exercises, setExcercise] = React.useState<Exercise[]>([])
    const [selectedExcercise, setSelectedExcercise] = React.useState('')
    const navigate = useNavigate()

    React.useEffect(() => {
        fetchExercises().then((exercises) => {
            setExcercise(exercises)
        })
    }, [])

    const viewStats = (key: React.Key | null) => {
        if (key) {
            setSelectedExcercise(key?.toString())
            navigate(`/stats?exercise_id=${key}`)
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Sélectionnez un exercice</ModalHeader>
                        <ModalBody>
                            <Autocomplete
                                defaultItems={exercises}
                                label='Exercices'
                                placeholder='Chercher un exercice'
                                className='max-w-xs'
                                selectedKey={selectedExcercise}
                                onSelectionChange={viewStats}>
                                {(exercise) => (
                                    <AutocompleteItem key={exercise.id}>
                                        {exercise.name}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                        </ModalBody>

                        <ModalFooter></ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
