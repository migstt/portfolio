"use client";

import React from "react";
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function ResumeModal() {

    // opaque or blur
    const modalBackDrop = `opaque`

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = useState<string>('5xl')
    const handleOpen = (size: string) => {
        setSize(size)
        onOpen();
    }

    return (
        <>
            <Button key={size} onPress={() => handleOpen(size)} color="secondary" variant="solid">View Resume</Button>
            <Modal
                size={'5xl'}
                isOpen={isOpen}
                onClose={onClose}
                backdrop={modalBackDrop}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Miguel Resume To Do</ModalHeader>
                            <ModalBody>
                                <p>
                                    This is for my resume, install react pdf parser
                                    This is for my resume, install react pdf parser
                                    This is for my resume, install react pdf parser
                                </p>
                                <p>
                                    This is for my resume, install react pdf parser
                                    This is for my resume, install react pdf parser
                                    This is for my resume, install react pdf parser
                                </p>
                                <p>
                                    This is for my resume, install react pdf parser
                                    This is for my resume, install react pdf parser
                                    This is for my resume, install react pdf parser
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="secondary" onPress={onClose}>
                                    Download
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
