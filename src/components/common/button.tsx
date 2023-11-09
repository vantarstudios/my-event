import type { FunctionComponent, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FunctionComponent<ButtonProps> = ({ className, children, ...props }) => {
    return (
        <button
            className={cn(
                'w-full rounded-3xl bg-black py-2.5 text-white',
                'text-md font-medium transition-all duration-200 hover:border-opacity-80 hover:bg-opacity-80',
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
