import type { FunctionComponent } from 'react';
import { Modal, Card } from '@components/ui/layouts';
import { Button } from '@components/ui/buttons';

interface DeletionConfirmModalProps {
    title: string;
    description: string;
    isModalOpen: boolean;
    isDeleting: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeletionConfirmModal: FunctionComponent<DeletionConfirmModalProps> = ({ title, description, isModalOpen, isDeleting, onConfirm, onCancel }) => {
    return (
        <Modal isOpened={isModalOpen}>
            <Card className="flex flex-col gap-5 px-10 pt-10 pb-5 bg-white rounded-2xl">
                <p className="text-xl font-bold">{title}</p>
                <p>{description}</p>
                <div className="flex justify-end items-center gap-5 w-full">
                    <Button
                        className="text-black font-medium border border-black bg-white hover:bg-black hover:bg-opacity-100 hover:text-white"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        loading={isDeleting}
                        onClick={onConfirm}
                        className="hover:bg-red-500 hover:bg-opacity-100"
                    >
                        Delete
                    </Button>
                </div>
            </Card>
        </Modal>
    );
};

export default DeletionConfirmModal;
