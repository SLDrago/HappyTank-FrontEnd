import React from 'react';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button
} from "@material-tailwind/react";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete }) => {
    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader>Delete Advertisement</DialogHeader>
            <DialogBody>
                <p>Are you sure you want to delete this advertisement?</p>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={onClose}
                    className="mr-2"
                >
                    Cancel
                </Button>
                <Button
                    variant="gradient"
                    color="red"
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DeleteModal;
