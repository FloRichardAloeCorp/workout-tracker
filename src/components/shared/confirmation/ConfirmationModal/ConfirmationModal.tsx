import * as React from 'react'
import type { UseDisclosureReturn } from '@nextui-org/use-disclosure'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export interface IConfirmationModalProps {
    message: string
    disclosure: UseDisclosureReturn
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmationModal(props: IConfirmationModalProps) {
    const { isOpen, onOpenChange } = props.disclosure

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='text-danger flex flex-row items-center gap-x-1'>
                            <ExclamationTriangleIcon className='size-6' />
                            <p className='text-xl'>Attention</p>
                        </ModalHeader>
                        <ModalBody>
                            <p>{props.message}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant='bordered'
                                className='text-[#44a2c2] border-[#44a2c2]'
                                onPress={() => {
                                    props.onCancel()
                                    onClose()
                                }}>
                                Annuler
                            </Button>
                            <Button
                                className='text-[#37b88d] bg-[#3fcd9e43]'
                                onPress={() => {
                                    props.onConfirm()
                                    onClose()
                                }}>
                                Confirmer
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
