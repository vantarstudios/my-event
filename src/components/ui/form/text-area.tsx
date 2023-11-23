import type { FunctionComponent, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
    value: HTMLTextAreaElement['value'];
    rows?: HTMLTextAreaElement['rows'];
    variant: 'edit' | 'form';
    className?: HTMLAttributes<HTMLTextAreaElement>['className'];
}

const TextArea: FunctionComponent<TextAreaProps> = ({ value, rows, variant, className, ...props }) => {
    return (
        <textarea
            className={cn(
                'resize-none rounded-3xl focus:outline-none',
                variant === 'edit'
                    ? 'px-5 py-2 border-none caret-primary placeholder-black placeholder:text-sm focus:px-5 focus:py-2 focus:bg-gray-100'
                    : 'w-full h-full px-8 py-2 ring-transparent bg-white drop-shadow-md border border-opacity-5',
                variant === 'edit' && value === '' && 'bg-gray-100',
                className,
            )}
            value={value}
            rows={rows}
            {...props}
        />
    );
};

export default TextArea;
