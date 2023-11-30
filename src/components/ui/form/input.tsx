import type { FunctionComponent, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import InputWrapper from './input-wrapper';
import type { InputWrapperProps } from './input-wrapper';

interface InputProps extends HTMLAttributes<HTMLInputElement>, InputWrapperProps {
    value?: HTMLInputElement['value'];
    disabled?: HTMLInputElement['disabled'];
    type?: 'text' | 'password' | 'email' | 'number' | 'tel';
    autoComplete?: HTMLInputElement['autocomplete'];
    variant?: 'default' | 'auth';
    className?: HTMLAttributes<HTMLInputElement>['className'];
}

const Input: FunctionComponent<InputProps> = (props) => {
    return (
        <InputWrapper
            name={props.name}
            label={props.label}
            trailing={props.trailing}
            icon={props.icon}
            wrapperClassName={props.wrapperClassName}
            labelClassName={props.labelClassName}
        >
            <input
                className={cn(
                    'w-full rounded-full pl-8 text-sm focus:outline-none ring-transparent',
                    props.icon ? 'pr-10' : 'pr-4',
                    props.variant === 'auth'
                        ? 'py-2 bg-gray-100'
                        : 'py-3 font-medium bg-white drop-shadow-md border border-opacity-10',
                    props.className,
                )}
                type={props.type ?? 'text'}
                value={props.value ?? ''}
                onChange={props.onChange}
                placeholder={props.placeholder}
                name={props.name}
                autoComplete={props.autoComplete}
                disabled={props.disabled}
                autoFocus={props.autoFocus}
            />
            <div className="absolute bottom-2.5 right-4">{props.icon}</div>
        </InputWrapper>
    );
};

export default Input;
