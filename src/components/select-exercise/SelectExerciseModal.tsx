import * as React from 'react'

import type { UseDisclosureReturn } from '@nextui-org/use-disclosure'
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react'
import { Exercise } from '../../type'
import { SelectExerciseAutocomplete } from './SelectExerciseAutocomplete'

export interface ISelectExerciseModalProps {
    exercises: Exercise[]
    disclosure: UseDisclosureReturn
    onSelectedExercise: (exerciseId: string) => void
}

export function SelectExerciseModal(props: ISelectExerciseModalProps) {
    const { isOpen, onOpenChange, onClose } = props.disclosure

    const onSelect = (key: React.Key | null) => {
        if (key) {
            props.onSelectedExercise(key.toString())
            onClose()
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Sélectionnez un exercice</ModalHeader>
                        <ModalBody>
                            <SelectExerciseAutocomplete
                                exercises={props.exercises}
                                onSelect={onSelect}
                            />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
