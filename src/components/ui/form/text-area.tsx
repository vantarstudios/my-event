import type { FunctionComponent, HTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
    value?: HTMLTextAreaElement['value'];
    placeholder?: HTMLTextAreaElement['placeholder'];
    rows?: HTMLTextAreaElement['rows'];
    register?: UseFormRegisterReturn;
    className?: HTMLAttributes<HTMLTextAreaElement>['className'];
}

const TextArea: FunctionComponent<TextAreaProps> = ({ value, rows, className, ...props }) => {
    return (
        <textarea
            className={cn(
                'resize-none rounded-3xl focus:outline-none px-5 py-2 border-none caret-primary placeholder-black placeholder:text-sm focus:bg-gray-100',
                value === '' && 'bg-gray-100',
                className,
            )}
            value={!props.register ? (value ?? '') : undefined}
            rows={rows}
            {...props}
            {...props.register}
        />
    );
};

export default TextArea;
