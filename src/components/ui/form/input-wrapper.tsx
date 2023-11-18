import type { FunctionComponent, ReactNode, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export interface InputWrapperProps {
    name: HTMLInputElement['name'];
    label?: string;
    trailing?: string;
    icon?: ReactNode;
    labelClassName?: HTMLAttributes<HTMLSpanElement>['className'];
    wrapperClassName?: HTMLAttributes<HTMLDivElement>['className'];
}

const InputWrapper: FunctionComponent<PropsWithChildren<InputWrapperProps>> = (props) => {
    return (
        <div className={cn('relative flex flex-col items-start gap-1', props.wrapperClassName)}>
            <label className="flex w-full items-center justify-between px-3" htmlFor={props.name}>
                <span className={cn('font-medium', props.labelClassName)}>{props.label}</span>
                <span className="font-medium text-red-600">{props.trailing}</span>
            </label>
            {props.children}
            <div className="absolute bottom-2.5 right-4">{props.icon}</div>
        </div>
    );
};

export default InputWrapper;
