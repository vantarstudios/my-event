import type { FunctionComponent, ReactNode, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export interface InputWrapperProps {
    name: HTMLInputElement['name'];
    label?: string;
    trailing?: string;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    labelClassName?: HTMLAttributes<HTMLSpanElement>['className'];
    wrapperClassName?: HTMLAttributes<HTMLDivElement>['className'];
    errors?: string | string[];
}

const InputWrapper: FunctionComponent<PropsWithChildren<InputWrapperProps>> = (props) => {
    return (
        <div className={cn('flex flex-col items-start gap-1 w-full', props.wrapperClassName)}>
            <div className="relative flex flex-col items-start gap-1 w-full">
                <label className="flex w-full items-center justify-between px-3" htmlFor={props.name}>
                    <span className={cn('font-semibold', props.labelClassName)}>{props.label}</span>
                    <span className="font-medium text-red-600">{props.trailing}</span>
                </label>
                {props.children}
                <div className={`absolute bottom-2.5 ${
                    props.iconPosition === 'left' ? 'left-4' : 'right-4'
                }`}>
                    {props.icon}
                </div>
            </div>
            {
                props.errors && (
                    Array.isArray(props.errors)
                        ? (
                            <ul className="pl-3">
                                {
                                    props.errors.map((error, index) => (
                                        <li key={index} className="text-sm text-red-500">{error}</li>
                                    ))
                                }
                            </ul>
                        )
                        : <p className="pl-3 text-sm text-red-500">{props.errors}</p>
                )
            }
        </div>
    );
};

export default InputWrapper;
