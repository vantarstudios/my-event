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
                'resize-none focus:outline-none',
                variant === 'edit'
                    ? 'border-none rounded-md caret-primary focus:p-2 focus:bg-gray-100'
                    : 'w-full h-full rounded-3xl px-8 py-2 ring-transparent bg-white drop-shadow-md border border-opacity-5',
                className,
            )}
            value={value}
            rows={rows}
            {...props}
        />
    );
};

export default TextArea;
