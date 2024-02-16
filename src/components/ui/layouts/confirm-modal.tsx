import type { FunctionComponent } from 'react';
import { Modal, Card } from '@components/ui/layouts';
import { Button, SecondaryButton } from '@components/ui/buttons';

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
                    <SecondaryButton onClick={onCancel}>
                        {cancelText}
                    </SecondaryButton>
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
