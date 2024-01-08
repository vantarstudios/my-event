import type { FunctionComponent, HTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import InputWrapper from './input-wrapper';
import type { InputWrapperProps } from './input-wrapper';

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement>, InputWrapperProps {
    value?: HTMLTextAreaElement['value'];
    placeholder?: HTMLTextAreaElement['placeholder'];
    rows?: HTMLTextAreaElement['rows'];
    register?: UseFormRegisterReturn;
    className?: HTMLAttributes<HTMLTextAreaElement>['className'];
}

const TextArea: FunctionComponent<TextAreaProps> = ({
    name,
    label,
    trailing,
    icon,
    errors,
    wrapperClassName,
    labelClassName,
    value,
    rows,
    className,
    ...props
}) => {
    return (
        <InputWrapper
            name={name}
            label={label}
            trailing={trailing}
            icon={icon}
            errors={errors}
            wrapperClassName={wrapperClassName}
            labelClassName={labelClassName}
        >
            <textarea
                className={cn(
                    'w-full resize-none rounded-3xl focus:outline-none px-5 py-2 border-none placeholder-gray-500 focus:bg-gray-100',
                    (!value || value === '') && 'bg-gray-100',
                    className,
                )}
                value={!props.register ? (value ?? '') : undefined}
                rows={rows}
                {...props}
                {...props.register}
            />
        </InputWrapper>
    );
};

export default TextArea;
