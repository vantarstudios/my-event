import type { FunctionComponent, HTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import InputWrapper from './input-wrapper';
import type { InputWrapperProps } from './input-wrapper';

interface InputProps extends HTMLAttributes<HTMLInputElement>, InputWrapperProps {
    value?: HTMLInputElement['value'];
    placeholder?: HTMLInputElement['placeholder'];
    disabled?: HTMLInputElement['disabled'];
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search';
    autoComplete?: HTMLInputElement['autocomplete'];
    className?: HTMLAttributes<HTMLInputElement>['className'];
    register?: UseFormRegisterReturn;
    errors?: string | string[];
}

const Input: FunctionComponent<InputProps> = (props) => {
    return (
        <InputWrapper
            name={props.name}
            label={props.label}
            trailing={props.trailing}
            icon={props.icon}
            iconPosition={props.iconPosition}
            errors={props.errors}
            wrapperClassName={props.wrapperClassName}
            labelClassName={props.labelClassName}
        >
            <input
                id={props.name}
                className={cn(
                    'w-full rounded-full pl-8 py-2 h-10 bg-gray-100 focus:outline-none ring-transparent',
                    props.icon ? 'pr-10' : 'pr-4',
                    props.className,
                )}
                type={props.type ?? 'text'}
                value={!props.register ? (props.value ?? '') : undefined}
                onChange={props.onChange}
                placeholder={props.placeholder}
                name={props.name}
                autoComplete={props.autoComplete}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
                defaultValue={props.defaultValue}
                onKeyDown={props.onKeyDown}
                {...props.register}
            />
        </InputWrapper>
    );
};

export default Input;
