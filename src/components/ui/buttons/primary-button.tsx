import type { FunctionComponent } from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps, default as Button } from './button';

interface PrimaryButtonProps extends ButtonProps {}

const PrimaryButton: FunctionComponent<PrimaryButtonProps> = ({ disabled, className, ...props }) => {
    return (
        <Button
            {...props}
            disabled={disabled}
            className={cn(
                'outline-none',
                !disabled && 'hover:bg-primary hover:bg-opacity-100',
                className,
            )}
        />
    );
};

export default PrimaryButton;
