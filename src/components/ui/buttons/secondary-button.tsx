import type { FunctionComponent } from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps, default as Button } from './button';

interface SecondaryButtonProps extends ButtonProps {}

const SecondaryButton: FunctionComponent<SecondaryButtonProps> = ({ disabled, className, ...props }) => {
    return (
        <Button
            {...props}
            disabled={disabled}
            className={cn(
                'outline-none',
                !disabled && 'font-medium text-black border-2 border-black bg-white hover:bg-black hover:bg-opacity-100 hover:text-white',
                className,
            )}
        />
    );
};

export default SecondaryButton;
