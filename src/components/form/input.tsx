import type { FunctionComponent, HTMLInputTypeAttribute } from 'react';
import { cn } from '@/lib/utils';

interface InputProps {
    name: string;
    label?: string;
    placeholder?: string;
    trailing?: string;
    className?: string;
    type?: HTMLInputTypeAttribute;
}

const Input: FunctionComponent<InputProps> = (props: InputProps) => {
    return (
        <div className={cn('flex flex-col items-start gap-2', props.className)}>
            <label
                className="flex w-full items-center justify-between px-3"
                htmlFor={props.name}
            >
                <span className="text-lg font-[500]">{props.label}</span>
                <span className="font-medium text-red-600">
                    {props.trailing}
                </span>
            </label>
            <input
                className="w-full rounded-full bg-gray-100 px-4 py-2 outline-none ring-transparent"
                type={props.type ?? 'text'}
                placeholder={props.placeholder}
                name={props.name}
            />
        </div>
    );
};

export default Input;
