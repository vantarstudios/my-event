import type { FunctionComponent } from 'react';
import { Modal, Card } from '@components/ui/layouts';
import { Button } from '@components/ui/buttons';

interface DeletionConfirmModalProps {
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    variant: 'danger' | 'success';
    isModalOpen: boolean;
    isConfirming: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: FunctionComponent<DeletionConfirmModalProps> = ({ title, description, confirmText, cancelText, variant, isModalOpen, isConfirming, onConfirm, onCancel }) => {
    return (
        <Modal isOpened={isModalOpen}>
            <Card className="flex flex-col gap-5 min-w-[30vw] px-10 pt-10 pb-5 bg-white rounded-2xl">
                <p className="text-xl font-bold">{title}</p>
                <p>{description}</p>
                <div className="flex justify-end items-center gap-5 w-full">
                    <Button
                        className="text-black font-medium border border-black bg-white hover:bg-black hover:bg-opacity-100 hover:text-white"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        loading={isConfirming}
                        onClick={onConfirm}
                        className={`hover:bg-opacity-100 ${
                            variant === 'danger'
                                ? 'hover:bg-red-600'
                                : 'hover:bg-green-600'
                        }`}
                    >
                        {confirmText}
                    </Button>
                </div>
            </Card>
        </Modal>
    );
};

export default ConfirmModal;
