import type { FunctionComponent, ReactNode, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export interface InputWrapperProps {
    name: HTMLInputElement['name'];
    label?: string;
    trailing?: string;
    icon?: ReactNode;
    labelClassName?: HTMLAttributes<HTMLSpanElement>['className'];
    wrapperClassName?: HTMLAttributes<HTMLDivElement>['className'];
    errors?: string | string[];
}

const InputWrapper: FunctionComponent<PropsWithChildren<InputWrapperProps>> = (props) => {
    return (
        <div className={cn('relative flex flex-col items-start gap-1', props.wrapperClassName)}>
            <label className="flex w-full items-center justify-between px-3" htmlFor={props.name}>
                <span className={cn('font-medium', props.labelClassName)}>{props.label}</span>
                <span className="font-medium text-red-600">{props.trailing}</span>
            </label>
            {props.children}
            <div className="absolute bottom-3 right-4">{props.icon}</div>
            {
                Array.isArray(props.errors)
                    ? (
                        <ul className="text-xs text-red-500">
                            {
                                props.errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))
                            }
                        </ul>
                    )
                    : <p className="pl-3 text-xs text-red-500">{props.errors}</p>
            }
        </div>
    );
};

export default InputWrapper;
