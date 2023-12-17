import type { FunctionComponent, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Loader } from '@components/ui/icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({ loading, className, children, ...props }) => {
    return (
        <button
            className={cn(
                'w-fit rounded-3xl bg-black px-8 py-2.5 text-white',
                'text-md font-medium transition-all duration-200 hover:border-opacity-80 hover:bg-opacity-80',
                loading && 'flex gap-2 pl-5 cursor-not-allowed',
                className,
            )}
            {...props}
        >
            {loading && <Loader className="w-5 h-5 animate-spin"/>}
            {children}
        </button>
    );
};

export default Button;
