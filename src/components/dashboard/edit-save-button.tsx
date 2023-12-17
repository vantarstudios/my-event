import type { FunctionComponent, MouseEvent, HTMLAttributes } from 'react';
import { Button } from '@components/ui';
import { cn } from '@/lib/utils';
import type { Mode } from '@/types';

interface EditSaveButtonProps {
    mode: Mode;
    loading?: boolean;
    onClick: () => void;
    className?: HTMLAttributes<HTMLButtonElement>['className'];
}

const EditSaveButton: FunctionComponent<EditSaveButtonProps> = ({ mode, loading, onClick, className }) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick();
    };

    return (
        <Button
            loading={loading}
            onClick={handleClick}
            className={cn(
                'py-1 text-sm border-2 border-black',
                mode === 'view' ? 'text-black bg-white hover:text-white hover:bg-black' : 'text-white bg-black',
                className,
            )}
        >
            {mode === 'view' ? 'Edit' : 'Save'}
        </Button>
    );
};

export default EditSaveButton;
