import type { FunctionComponent, ReactNode, HTMLInputTypeAttribute, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
    name: HTMLInputElement['name'];
    value?: HTMLInputElement['value'];
    disabled?: HTMLInputElement['disabled'];
    label?: string;
    trailing?: string;
    type?: HTMLInputTypeAttribute;
    autoComplete?: HTMLInputElement['autocomplete'];
    icon?: ReactNode;
    className?: HTMLAttributes<HTMLInputElement>['className'];
    labelClassName?: HTMLAttributes<HTMLSpanElement>['className'];
    wrapperClassName?: HTMLAttributes<HTMLDivElement>['className'];
}

const Input: FunctionComponent<InputProps> = (props) => {
    return (
        <div className={cn('relative flex flex-col items-start gap-1', props.wrapperClassName)}>
            <label className="flex w-full items-center justify-between px-3" htmlFor={props.name}>
                <span className={cn('font-medium', props.labelClassName)}>{props.label}</span>
                <span className="font-medium text-red-600">{props.trailing}</span>
            </label>
            <input
                className={cn(
                    'w-full rounded-full bg-gray-100 pl-4 py-2 text-sm outline-none ring-transparent',
                    props.icon ? 'pr-10' : 'pr-4',
                    props.className,
                )}
                type={props.type ?? 'text'}
                value={props.value ?? ''}
                onChange={props.onChange}
                placeholder={props.placeholder}
                name={props.name}
                autoComplete={props.autoComplete}
                disabled={props.disabled}
            />
            <div className="absolute bottom-2.5 right-4">{props.icon}</div>
        </div>
    );
};

export default Input;
