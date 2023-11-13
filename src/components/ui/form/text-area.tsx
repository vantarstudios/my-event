import type { FunctionComponent, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
    value: HTMLTextAreaElement['value'];
    rows?: HTMLTextAreaElement['rows'];
    className?: HTMLAttributes<HTMLTextAreaElement>['className'];
}

const TextArea: FunctionComponent<TextAreaProps> = ({ value, rows, className, ...props }) => {
    return (
        <textarea
            className={cn(
                'resize-none border-none rounded-md caret-primary focus:outline-none focus:p-2 focus:bg-gray-100',
                className,
            )}
            value={value}
            rows={rows}
            {...props}
        />
    );
};

export default TextArea;
