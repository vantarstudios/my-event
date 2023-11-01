import React, { HTMLProps } from 'react';
import cn from '@/lib/utils/cn';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    children?: React.ReactNode;
    classname?: string;
}

function Button(props: ButtonProps): React.JSX.Element {
    return (
        <button
            className={cn(
                'w-full rounded-3xl border-2 border-black bg-black py-2 text-white',
                'text-md font-medium transition-all duration-200 hover:border-opacity-80 hover:bg-opacity-80',
                props.className,
            )}
        >
            {props.children}
        </button>
    );
}

export default Button;
