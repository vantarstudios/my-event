import type { FunctionComponent, HTMLInputTypeAttribute, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
    name: HTMLInputElement['name'];
    value?: HTMLInputElement['value'];
    disabled?: HTMLInputElement['disabled'];
    label?: string;
    trailing?: string;
    type?: HTMLInputTypeAttribute;
    className?: HTMLAttributes<HTMLInputElement>['className'];
    labelClassName?: HTMLAttributes<HTMLSpanElement>['className'];
    wrapperClassName?: HTMLAttributes<HTMLDivElement>['className'];
}

const Input: FunctionComponent<InputProps> = (props) => {
    return (
        <div className={cn('flex flex-col items-start gap-1', props.wrapperClassName)}>
            <label className="flex w-full items-center justify-between px-3" htmlFor={props.name}>
                <span className={cn('font-medium', props.labelClassName)}>{props.label}</span>
                <span className="font-medium text-red-600">{props.trailing}</span>
            </label>
            <input
                className={cn(
                    'w-full rounded-full bg-gray-100 px-4 py-2 text-sm outline-none ring-transparent',
                    props.className,
                )}
                type={props.type ?? 'text'}
                value={props.value ?? ''}
                placeholder={props.placeholder}
                name={props.name}
                disabled={props.disabled}
            />
        </div>
    );
};

export default Input;
